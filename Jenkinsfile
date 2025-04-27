pipeline {
    agent any
    stages{
        stage('Build'){
            steps{
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Juanpy616/tingeso1Front.git']]])
                bat 'npm install'
                bat 'npm run build'
            }
        }
        stage('Build docker image'){
            steps{
                script{
                    bat 'docker build -t juanpy616/tgs1front:latest .'
                }
            }
        }
        stage('Push image to Docker Hub'){
            steps{
                script{
                   withCredentials([string(credentialsId: 'dockerhubpassword', variable: 'dhpsw')]) {
                        bat 'docker login -u juanpy616 -p %dhpsw%'
                   }
                   bat 'docker push juanpy616/tgs1front:latest'
                }
            }
        }
    }
}