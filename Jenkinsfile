pipeline {
    agent any

    environment {
        ECR_REGISTRY = 'public.ecr.aws/v2w9p4l2'
        ECR_REPO = 'project'
        IMAGE_TAG = 'latest'
        EC2_USER = 'ec2-user'
        EC2_HOST = 'your-ec2-public-ip'
        SSH_KEY = '/path/to/your/private-key.pem'
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    echo 'Checking out the source code...'
                }
                git 'https://github.com/shivampatil2110/Shopsy.git'
                script {
                    echo 'Pulled source code successfully...'
                }
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Build Frontend Image') {
                    steps {
                        script {
                            echo 'Building Frontend Docker Image...'
                            sh '''
                            cd frontend
                            docker build -t frontend:latest .
                            '''
                        }
                    }
                }
                stage('Build Backend Image') {
                    steps {
                        script {
                            echo 'Building Backend Docker Image...'
                            sh '''
                            cd backend
                            docker build -t backend:latest .
                            '''
                        }
                    }
                }
            }
        }

        stage('Login to AWS ECR') {
            steps {
                echo 'Logging in to AWS ECR...'
                sh """
                aws ecr-public get-login-password --region ap-south-1 | docker login --username AWS --password-stdin public.ecr.aws/v2w9p4l2
                aws ecr-public get-login-password --region ap-south-1 | docker login --username AWS --password-stdin public.ecr.aws/v2w9p4l2
                """
            }
        }

        stage('Push Docker Images to ECR') {
            parallel {
                stage('Push Frontend Image') {
                    steps {
                        script {
                            echo 'Tagging and Pushing Frontend Docker Image...'
                            sh """
                            docker tag frontend:latest public.ecr.aws/v2w9p4l2/frontend:latest
                            docker push public.ecr.aws/v2w9p4l2/frontend:latest
                            """
                        }
                    }
                }
                stage('Push Backend Image') {
                    steps {
                        script {
                            echo 'Tagging and Pushing Backend Docker Image...'
                            sh """
                            docker tag backend:latest public.ecr.aws/v2w9p4l2/backend:latest
                            docker tag backend:latest public.ecr.aws/v2w9p4l2/backend:latest
                            """
                        }
                    }
                }
            }
        }


        // stage('Push to AWS ECR') {
        //     steps {
        //         script {
        //             // Authenticate to AWS ECR
        //             echo 'Starting the ECR push process...'
        //             sh """
        //             aws ecr-public get-login-password --region ap-south-1 | docker login --username AWS --password-stdin $ECR_REGISTRY
        //             """
        //             // Push the Docker image
        //             sh """docker push $ECR_REGISTRY/$ECR_REPO:$IMAGE_TAG"""
        //             echo 'Completed the push process...'
        //         }
        //     }
        // }

        // stage('Deploy on EC2') {
        //     steps {
        //         script {
        //             // SSH into EC2 instance and deploy the Docker image
        //             sh """
        //             ssh -i $SSH_KEY $EC2_USER@$EC2_HOST <<EOF
        //             docker login --username AWS --password-stdin $ECR_REGISTRY
        //             docker pull $ECR_REGISTRY/$ECR_REPO:$IMAGE_TAG
        //             docker-compose up -d
        //             EOF
        //             """
        //         }
        //     }
        // }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs above for more details.'
        }
        always {
            cleanWs() // Clean up workspace after build
        }
    }

}
