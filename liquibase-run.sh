#!/bin/bash
tree &&
liquibase \
  --changeLogFile=/app/src/database/liquibase/changelog/db.changelog-main.yaml \
  --url=jdbc:postgresql://postgres:5432/teste \
  --username=postgres \
  --password=secret \
  --classpath=/app/src/database/liquibase/drivers/postgresql-42.7.3.jar \
  --searchPath=/app/src/database/liquibase/changelog \
  update
