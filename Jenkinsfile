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
        APPENV = "${params.APPENV}"
    }
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
        ansiColor('xterm')
        skipDefaultCheckout()  // We'll handle checkout explicitly
        disableConcurrentBuilds()
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Clean workspace before checkout
                cleanWs()
                checkout scm
            }
        }
        
        stage('Setup') {
            steps {
                script {
                    echo "Setting up environment: ${APPENV}"
                    sh 'npm install'
                }
            }
        }
        
        stage('Prepare Test Run') {
            steps {
                script {
                    sh 'npm run clean'
                }
            }
        }
        
        stage('Execute Tests') {
            steps {
                script {
                    try {
                        // Debugging: Print environment variables
                        sh 'printenv | grep APPENV'
                        
                        // Run Cypress tests in parallel
                        sh 'export APPENV="${APPENV}" && npm run cy:run:parallel'
                    } catch (err) {
                        echo "Test execution completed with some failures"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }
        
        stage('Generate Reports') {
            steps {
                script {
                    sh 'npm run generate-report'
                }
            }
        }
        
        stage('Publish Results') {
            steps {
                script {
                    archiveArtifacts artifacts: 'cypress/reports/**/*', allowEmptyArchive: true
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'cypress/reports',
                        reportFiles: 'mochawesome.html',
                        reportName: "Cypress Test Report - ${APPENV}"
                    ])
                }
            }
        }
    }
    
    post {
        always {
            // Clean workspace after build
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