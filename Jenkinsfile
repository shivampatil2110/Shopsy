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
        // stage('Build Docker Images') {
        //     parallel {
        //         stage('Build Frontend Image') {
        //             steps {
        //                 script {
        //                     echo 'Building Frontend Docker Image...'
        //                     sh '''
        //                     cd frontend
        //                     docker build -t frontend .
        //                     '''
        //                 }
        //             }
        //         }
        //         stage('Build Backend Image') {
        //             steps {
        //                 script {
        //                     echo 'Building Backend Docker Image...'
        //                     sh '''
        //                     cd backend
        //                     docker build -t backend .
        //                     '''
        //                 }
        //             }
        //         }
        //     }
        // }

        // stage('Login to AWS ECR') {
        //     steps {
        //         echo 'Logging in to AWS ECR...'
        //         sh """
        //         aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/v2w9p4l2
        //         """
        //     }
        // }

        // stage('Push Docker Images to ECR') {
        //     parallel {
        //         stage('Push Frontend Image') {
        //             steps {
        //                 script {
        //                     echo 'Tagging and Pushing Frontend Docker Image...'
        //                     sh """
        //                     docker tag frontend:latest public.ecr.aws/v2w9p4l2/frontend:latest
        //                     docker push public.ecr.aws/v2w9p4l2/frontend:latest
        //                     """
        //                 }
        //             }
        //         }
        //         stage('Push Backend Image') {
        //             steps {
        //                 script {
        //                     echo 'Tagging and Pushing Backend Docker Image...'
        //                     sh """
        //                     docker tag backend:latest public.ecr.aws/v2w9p4l2/backend:latest
        //                     docker push public.ecr.aws/v2w9p4l2/backend:latest
        //                     """
        //                 }
        //             }
        //         }
        //     }
        // }

        stage('Deploy to EC2') {
            steps {
                script {
                    echo "Path is"
                    sh """
                    # SSH into the EC2 instance and pull images
                    realpath --relative-to = /
                    chmod 400 "/key-pair.pem"
                    ssh -i "/key-pair.pem" ubuntu@ec2-13-126-229-212.ap-south-1.compute.amazonaws.com << EOF
                        docker pull public.ecr.aws/v2w9p4l2/frontend:latest
                        docker pull public.ecr.aws/v2w9p4l2/backend:latest

                        # Stop existing containers (if any)
                        docker stop frontend backend || true
                        docker rm frontend backend || true

                        # Run new containers
                        docker run -d -p 80:80 --name frontend public.ecr.aws/v2w9p4l2/frontend:latest
                        docker run -d -p 35000:35000 --name backend public.ecr.aws/v2w9p4l2/backend:latest
                    EOF
                    """
                }
            }
        }

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