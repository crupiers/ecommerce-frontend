pipeline {

    agent any

    tools {
        nodejs 'nodejs'
    }

    stages {
        stage('CHECKOUT') {
            steps {
                git branch: 'deployment', url: 'https://github.com/crupiers/ecommerce-frontend.git'
                echo "Commit: ${env.GIT_COMMIT}"
            }
        }

        stage('DEPENDENCIES') {
            steps {
                sh 'npm install'
            }
        }

	stage('TEST') {
            steps {
                sh 'npm test'
            }
        }

	stage('BUILD') {
            steps {
                sh 'npm run build'
            }
        }

        stage('DOCKER') {
            steps {
                script {
                    sh "docker build . --dns 8.8.8.8 --dns 8.8.4.4 -t ec_fn"
                }
            }
        }
    }

    post {
        always {
            cleanWs()
            echo "Pipeline finalizada con commit: ${env.GIT_COMMIT}"
        }
        success {
            echo 'Pipeline exitosa'
        }
        failure {
            echo 'Pipeline fallida'
        }
    }
}