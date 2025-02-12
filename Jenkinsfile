pipeline {
    agent any

    parameters {
        choice(
            name: 'APPENV',
            choices: ['local', 'dev', 'prod', 'preprod'],
            description: 'Select the environment to run tests against'
        )
    }
    
    tools {
        nodejs 'NodeJS 18'  
    }

    environment {
        APPENV = "${params.APPENV}"
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
        ansiColor('xterm')
        skipDefaultCheckout()
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                cleanWs()
                checkout scm
            }
        }

        stage('Setup') {
            steps {
                script {
                    echo "Setting up environment: ${APPENV}"
                    sh '''
                        echo "Node installation details:"
                        which node
                        node --version
                        npm --version
                        
                        # Install dependencies
                        npm ci
                    '''
                }
            }
        }

        stage('Prepare Test Run') {
            steps {
                script {
                    sh '''
                        echo "Cleaning previous reports"
                        npm run clean
                    '''
                }
            }
        }

        stage('Execute Tests') {
            steps {
                script {
                    try {
                        sh """
                            echo "Running Cypress tests in environment: ${APPENV}"
                            export APPENV="${APPENV}"
                            npm run cy:run:parallel
                        """
                    } catch (err) {
                        echo "Test execution completed with some failures: ${err}"
                    }
                }
            }
        }

        stage('Generate Reports') {
            steps {
                script {
                    try {
                        sh 'npm run generate-report'
                    } catch (err) {
                        echo "Error generating report: ${err}"
                    }
                }
            }
        }

        stage('Publish Results') {
            steps {
                archiveArtifacts(
                    artifacts: '''
                        cypress/reports/**/*,
                        cypress/videos/**/*.mp4,
                        cypress/screenshots/**/*.png
                    ''',
                    allowEmptyArchive: true
                )
                publishHTML(
                    target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'cypress/reports',
                        reportFiles: 'mochawesome.html',
                        reportName: "Cypress Test Report - ${APPENV}"
                    ]
                )
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'All stages completed successfully!'
        }
        unstable {
            echo 'Test execution completed with some failures. Check the report for details.'
        }
        failure {
            echo 'Pipeline failed! Check the logs and report for details.'
        }
    }
}