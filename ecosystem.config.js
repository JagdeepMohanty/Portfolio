module.exports = {
  apps: [
    {
      name: 'portfolio-server',
      script: './index.js',
      cwd: './server',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      ignore_watch: ['node_modules', 'logs'],
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
