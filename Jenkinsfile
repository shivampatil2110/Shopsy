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
                git 'https://github.com/shivampatil2110/Shopsy.git'
            }
        }

        stage('Build and Tag Docker Images') {
            steps {
                script {
                    sh 'docker-compose build'
                    sh """
                    docker tag E-Commerce:latest $ECR_REGISTRY/$ECR_REPO:$IMAGE_TAG
                    """
                }
            }
        }

        stage('Push to AWS ECR') {
            steps {
                script {
                    // Authenticate to AWS ECR
                    sh """
                    aws ecr-public get-login-password --region ap-south-1 | docker login --username AWS --password-stdin $ECR_REGISTRY
                    """
                    // Push the Docker image
                    sh """docker push $ECR_REGISTRY/$ECR_REPO:$IMAGE_TAG"""
                }
            }
        }

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
        always {
            cleanWs() // Clean up workspace after build
        }
    }
}
