node {
    checkout scm
    docker.image('node:12').inside('-u root') {
        sh 'npm install'
        sh 'npm run build'
        sh 'ls'
    }
    
    docker.image('agung3wi/alpine-rsync:1.1').inside('-u root') {
         sshagent (credentials: ['ssh-dev']) {
             sh 'mkdir -p ~/.ssh'
             sh 'ssh-keyscan -H "pttas.xyz" > ~/.ssh/known_hosts'
             sh "rsync -rav --delete ./dist/ arin@pttas.xyz:/home/arin/smart-pln.pttas.xyz/public/ --exclude=index.php --exclude=.htaccess"
             //sh "ssh arin@pttas.xyz 'rm /home/arin/smart-pln.pttas.xyz/resources/views/home.blade.php'"
             sh "ssh arin@pttas.xyz 'mv /home/arin/smart-pln.pttas.xyz/public/index.html /home/arin/smart-pln.pttas.xyz/resources/views/home.blade.php'"
         }
    }
}
