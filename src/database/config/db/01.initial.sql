
-- Sequences
create SEQUENCE IF NOT exists seq_userrole increment 1 minvalue 1 start 1 cache 1;
alter sequence seq_userrole owner to postgres;

create SEQUENCE IF NOT exists seq_userstatus increment 1 minvalue 1 start 1 cache 1;
alter sequence seq_userstatus owner to postgres;

create sequence IF NOT EXISTS seq_user increment 1 minvalue 1 start 1 cache 1;
alter sequence seq_user owner to postgres;

create sequence IF NOT EXISTS seq_person increment 1 minvalue 1 start 1 cache 1;
alter sequence seq_person owner to postgres;

create sequence IF NOT EXISTS seq_contract increment 1 minvalue 1 start 1 cache 1;
alter sequence seq_contract owner to postgres;

-- Liquibase tables
create table IF NOT EXISTS databasechangelog (
  id            varchar(255) not null,
  author        varchar(255) not null,
  filename      varchar(255) not null,
  dateexecuted  timestamp    not null,
  orderexecuted integer      not null,
  exectype      varchar(10)  not null,
  md5sum        varchar(35),
  description   varchar(255),
  comments      varchar(255),
  tag           varchar(255),
  liquibase     varchar(20),
  contexts      varchar(255),
  labels        varchar(255),
  deployment_id varchar(10)
);
alter table databasechangelog owner to postgres;

create TABLE IF NOT exists databasechangeloglock (
  id          integer primary key,
  locked      boolean not null,
  lockgranted timestamp,
  lockedby    varchar(255)
);
alter table databasechangeloglock owner to postgres;

-- Domain tables
create TABLE IF NOT exists user_role (
  id          bigint primary key default nextval('seq_userrole'),
  name        varchar(100) not null,
  description varchar(255)
);
alter table user_role owner to postgres;

-- Tabela principal de usuários
create table IF NOT EXISTS "users" (
  id                 bigint primary key default nextval('seq_user'),
  name               varchar(100) not null,
  email              varchar(100) not null unique,
  password           varchar(100) not null,
  dob                date not null,
  id_userrole        bigint not null,
  id_current_status  bigint,
  constraint fk_user_userrole foreign key (id_userrole) references user_role(id)
  -- fk_user_current_status será adicionada depois (ver abaixo)
);
alter table "users" owner to postgres;

-- Histórico de status do usuário
create table IF NOT EXISTS user_status (
  id              bigint primary key default nextval('seq_userstatus'),
  id_user         bigint not null,
  description       varchar(255) not null,
  created_at      timestamp not null,
  updated_at      timestamp,
  deleted_at      timestamp,
  is_active       boolean not null,
  constraint fk_userstatus_user foreign key (id_user) references "users"(id)
);
alter table user_status owner to postgres;

-- Agora que user_status foi criada, adiciona FK do status atual no usuário
alter table "users"
add constraint fk_user_current_status
foreign key (id_current_status) references user_status(id);

create or replace function trg_user_status_versioning()
returns trigger as $$
declare
previous_status_id bigint;
begin
  -- Só executa se houve mudança no campo id_current_status
  if new.id_current_status is distinct from old.id_current_status then
    -- Atualiza o status antigo (se existir)
    if old.id_current_status is not null then
      update user_status
      set is_active = false,
      updated_at = now()
      where id = old.id_current_status;
    end if;

    -- Cria um novo histórico baseado no novo status (se não for nulo)
    if new.id_current_status is not null then
      insert into user_status (
        id_user,
        description,
        created_at,
        is_active
      )
      select 
      new.id,
      us.description,
      now(),
      true
      from user_status us
      where us.id = new.id_current_status;
    end if;
  end if;

  return new;
end;
$$ language plpgsql;

create trigger trg_user_status_versioning
after update of id_current_status on "users"
for each row
  execute procedure trg_user_status_versioning();

ALTER TABLE public.user_status ALTER COLUMN id_user DROP NOT NULL;



