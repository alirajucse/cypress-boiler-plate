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
                        echo "Node version: $(node -v)"
                        echo "NPM version: $(npm -v)"
                        
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
                            npm run cy:run:parallel || true
                        """
                    } catch (err) {
                        echo "Test execution completed with some failures: ${err}"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }

        stage('Generate Reports') {
            steps {
                script {
                    sh '''
                        # Run report generation and capture the exit code
                        npm run generate-report || true
                        
                        # Verify report was actually generated
                        if [ -f "cypress/reports/html/index.html" ]; then
                            echo "Report generated successfully"
                        else
                            echo "Report generation failed - file not found"
                            exit 1
                        fi
                    '''
                }
            }
        }

        stage('Publish Results') {
            steps {
                script {
                    // Archive test artifacts
                    archiveArtifacts(
                        artifacts: '''
                            cypress/reports/**/*,
                            cypress/videos/**/*.mp4,
                            cypress/screenshots/**/*.png
                        ''',
                        allowEmptyArchive: true
                    )
                    
                    // Publish HTML report
                    publishHTML(
                        target: [
                            allowMissing: false,
                            alwaysLinkToLastBuild: true,
                            keepAll: true,
                            reportDir: 'cypress/reports/html',
                            reportFiles: 'index.html',
                            reportName: "Cypress Test Report - ${APPENV}"
                        ]
                    )
                }
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