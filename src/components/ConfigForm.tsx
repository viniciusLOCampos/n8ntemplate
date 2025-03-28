const generateN8NCode = () => {
  const template = {
    services: [
      {
        type: "app",
        data: {
          projectName: formData.projectName,
          serviceName: "n8n_editor",
          source: {
            type: "image",
            image: "n8nio/n8n:latest"
          },
          env: `DB_POSTGRESDB_DATABASE=$(PROJECT_NAME)\r\nDB_POSTGRESDB_HOST=$(PROJECT_NAME)_n8n_postgres\r\nDB_POSTGRESDB_PASSWORD=${formData.postgresPassword}\r\nDB_POSTGRESDB_PORT=5432\r\nDB_POSTGRESDB_USER=postgres\r\nDB_TYPE=postgresdb\r\nQUEUE_BULL_REDIS_HOST=$(PROJECT_NAME)_redis_n8n\r\nQUEUE_BULL_REDIS_PASSWORD=${formData.redisPassword}\r\nQUEUE_BULL_REDIS_PORT=6379\r\nEXECUTIONS_MODE=queue\r\nEXECUTIONS_DATA_MAX_AGE=336\r\nEXECUTIONS_DATA_PRUNE=true\r\nGENERIC_TIMEZONE=America/Sao_Paulo\r\nN8N_DIAGNOSTICS_ENABLED=false\r\nN8N_EDITOR_BASE_URL=https://${formData.domainName}/\r\nN8N_ENCRYPTION_KEY=${formData.encryptionKey}\r\nN8N_HOST=${formData.domainName}/\r\nN8N_PROTOCOL=https\r\nNODE_ENV=production\r\nNODE_FUNCTION_ALLOW_EXTERNAL=moment,lodash,moment-with-locales\r\nN8N_LOG_LEVEL=debug\r\nN8N_LOG_OUTPUT=file,console\r\nN8N_LOG_FILE_LOCATION=/home/node/.n8n/logs/n8n-01.log\r\nTZ=America/Sao_Paulo\r\nWEBHOOK_URL=https://${formData.n8nWebhookDomain}/`,
          deploy: {
            replicas: 1,
            command: "n8n start",
            zeroDownTime: true
          },
          domains: [
            {
              host: formData.domainName,
              https: true,
              port: 5678,
              path: "/",
              wildcard: false
            }
          ],
          mounts: [
            {
              type: "volume",
              name: "data",
              mountPath: "/home/node/.n8n"
            }
          ]
        }
      },
      {
        type: "app",
        data: {
          projectName: formData.projectName,
          serviceName: "n8n_webhook",
          source: {
            type: "image",
            image: "n8nio/n8n:latest"
          },
          env: `DB_POSTGRESDB_DATABASE=$(PROJECT_NAME)\r\nDB_POSTGRESDB_HOST=$(PROJECT_NAME)_n8n_postgres\r\nDB_POSTGRESDB_PASSWORD=${formData.postgresPassword}\r\nDB_POSTGRESDB_PORT=5432\r\nDB_POSTGRESDB_USER=postgres\r\nDB_TYPE=postgresdb\r\nQUEUE_BULL_REDIS_HOST=$(PROJECT_NAME)_redis_n8n\r\nQUEUE_BULL_REDIS_PASSWORD=${formData.redisPassword}\r\nQUEUE_BULL_REDIS_PORT=6379\r\nEXECUTIONS_MODE=queue\r\nEXECUTIONS_DATA_MAX_AGE=336\r\nEXECUTIONS_DATA_PRUNE=true\r\nGENERIC_TIMEZONE=America/Sao_Paulo\r\nN8N_DIAGNOSTICS_ENABLED=false\r\nN8N_EDITOR_BASE_URL=https://${formData.domainName}/\r\nN8N_ENCRYPTION_KEY=${formData.encryptionKey}\r\nN8N_HOST=${formData.domainName}/\r\nN8N_PROTOCOL=https\r\nNODE_ENV=production\r\nNODE_FUNCTION_ALLOW_EXTERNAL=moment,lodash,moment-with-locales\r\nN8N_LOG_LEVEL=debug\r\nN8N_LOG_OUTPUT=file,console\r\nN8N_LOG_FILE_LOCATION=/home/node/.n8n/logs/n8n-01.log\r\nTZ=America/Sao_Paulo\r\nWEBHOOK_URL=https://${formData.n8nWebhookDomain}/`,
          deploy: {
            replicas: 1,
            command: "n8n webhook",
            zeroDownTime: true
          },
          domains: [
            {
              host: formData.n8nWebhookDomain,
              https: true,
              port: 5678,
              path: "/",
              wildcard: false
            }
          ],
          mounts: [
            {
              type: "volume",
              name: "data",
              mountPath: "/home/node/.n8n"
            }
          ]
        }
      },
      {
        type: "app",
        data: {
          projectName: formData.projectName,
          serviceName: "n8n_worker",
          source: {
            type: "image",
            image: "n8nio/n8n:latest"
          },
          env: `DB_POSTGRESDB_DATABASE=$(PROJECT_NAME)\r\nDB_POSTGRESDB_HOST=$(PROJECT_NAME)_n8n_postgres\r\nDB_POSTGRESDB_PASSWORD=${formData.postgresPassword}\r\nDB_POSTGRESDB_PORT=5432\r\nDB_POSTGRESDB_USER=postgres\r\nDB_TYPE=postgresdb\r\nQUEUE_BULL_REDIS_HOST=$(PROJECT_NAME)_redis_n8n\r\nQUEUE_BULL_REDIS_PASSWORD=${formData.redisPassword}\r\nQUEUE_BULL_REDIS_PORT=6379\r\nEXECUTIONS_MODE=queue\r\nEXECUTIONS_DATA_MAX_AGE=336\r\nEXECUTIONS_DATA_PRUNE=true\r\nGENERIC_TIMEZONE=America/Sao_Paulo\r\nN8N_DIAGNOSTICS_ENABLED=false\r\nN8N_EDITOR_BASE_URL=https://${formData.domainName}/\r\nN8N_ENCRYPTION_KEY=${formData.encryptionKey}\r\nN8N_HOST=${formData.domainName}/\r\nN8N_PROTOCOL=https\r\nNODE_ENV=production\r\nNODE_FUNCTION_ALLOW_EXTERNAL=moment,lodash,moment-with-locales\r\nN8N_LOG_LEVEL=debug\r\nN8N_LOG_OUTPUT=file,console\r\nN8N_LOG_FILE_LOCATION=/home/node/.n8n/logs/n8n-01.log\r\nTZ=America/Sao_Paulo\r\nWEBHOOK_URL=https://${formData.n8nWebhookDomain}/`,
          deploy: {
            replicas: 1,
            command: "n8n worker --concurrency=5",
            zeroDownTime: true
          },
          mounts: [
            {
              type: "volume",
              name: "data",
              mountPath: "/home/node/.n8n"
            }
          ]
        }
      }
    ]
  }
  setGeneratedCode(JSON.stringify(template, null, 2))
}
