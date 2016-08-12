
1. Install nodejs
    
    sudo apt-get update
    sudo apt-get install nodejs-legacy npm
    
2. Init directory

    cd /to/home/directory/of/your/projects
    mkdir eventer
    cd eventer

3. Install `eventer`
    
    3.1 Simple js-script
    
        node hello_world_script.js
    
    3.2 Simple server:
    
        # run server
        node hello_world_server.js
        
        # and try in other terminal
        curl localhost:8080