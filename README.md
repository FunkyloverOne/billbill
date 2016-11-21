# README

* Ruby version: 2.3.1

* System dependencies: nodejs stuff 

* Local server start:

  - Bundle and NPM install. Make sure you are on a recent version of node.
    Please use at least Node v5. Bundle is for adding execJs. You can
    remove that if you are sure you will not server render.
    
    ```bash
    bundle && npm install
    ```
  
  - Start your Rails server:
  
    ```bash
    foreman start -f Procfile.dev
    ```
