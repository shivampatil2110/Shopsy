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

        stage('Build and Tag Docker Images') {
            steps {
                script {
                    echo 'Starting the build process...'
                    sh 'docker-compose build'
                    echo 'docker-compose build completed'
                    echo "Tagging the frontend image"
                    sh """
                    docker tag frontend:latest $ECR_REGISTRY/$ECR_REPO-frontend:$IMAGE_TAG
                    """
                    echo 'Tagging the backend image'
                    sh """
                    docker tag backend:latest $ECR_REGISTRY/$ECR_REPO-backend:$IMAGE_TAG
                    """
                    echo 'docker tag completed'
                    echo 'Completed the build process...'
                }
            }
        }

        stage('Push to AWS ECR') {
            steps {
                script {
                    // Authenticate to AWS ECR
                    echo 'Starting the ECR push process...'
                    sh """
                    aws ecr-public get-login-password --region ap-south-1 | docker login --username AWS --password-stdin $ECR_REGISTRY
                    """
                    // Push the Docker image
                    sh """docker push $ECR_REGISTRY/$ECR_REPO:$IMAGE_TAG"""
                    echo 'Completed the push process...'
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
