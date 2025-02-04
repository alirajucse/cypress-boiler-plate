pipeline {
    agent any
    
    parameters {
        choice(
            name: 'APPENV',
            choices: ['local', 'dev', 'prod', 'preprod'],
            description: 'Select the environment to run tests against'
        )
    }
    
    environment {
        NODE_VERSION = '23.7.0'
        // Make APPENV available to all stages
        APPENV = "${params.APPENV}"
    }
    options {
        ansiColor('xterm')
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/alirajucse/cypress-boiler-plate.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                   sh 'npm install'
                }
            }
        }
        stage('Clean Reports') {
            steps {
                script {
                    sh 'npm run clean'
                }
            }
        }
        stage('Run Cypress Tests in Parallel') {
            steps {
                script {
                    sh 'npm run cy:run:parallel'
                }
            }
        }
        stage('Generate Mochawesome Report') {
            steps {
                script {
                    sh 'npm run generate-report'
                }
            }
        }
    }
    post {
        always {
            script {
                archiveArtifacts artifacts: 'cypress/reports/**/*', allowEmptyArchive: true
            }
            publishHTML([
                reportDir: 'cypress/reports',
                reportFiles: 'mochawesome.html',
                reportName: 'Cypress Test Report'
            ])
        }
        failure {
            echo 'Tests failed! Check the Mochawesome report for details.'
        }
    }
}
