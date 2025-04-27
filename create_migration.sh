if [ -n "$1" ]; then
  echo "Criando a migration com o nome: $1"
  npx typeorm migration:create src/database/migrations/"$1"
else
  echo "Por favor, forneça o nome da migration."
  echo "Uso: ./create_migration.sh <nome_da_migration>"
fi