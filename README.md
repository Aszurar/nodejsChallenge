# Nodejs Challenge | GoStack
 Esse é o 1º desafio do bootcamp GoStack da Rocketseat que revisa os conceitos básicos de uma aplicação REST com NodeJS.
<h2 align="center">Nodejs Challange</h2>

___

<div align="center" ><img src="https://media.giphy.com/media/oXU1BRfx6TtiCVc9yj/giphy.gif" width="500"></div>

- [**Link do vídeo completo sobre o projeto**](https://www.youtube.com/watch?v=MPB8h6bh_t4)
___

<h3 align="center">
  <a href="#information_source-sobre">Sobre</a>&nbsp;|&nbsp;
  <a href="#interrobang-motivo">Motivo</a>&nbsp;|&nbsp;
  <a href="#seedling-requisitos-mínimos">Requisitos</a>&nbsp;|&nbsp;
  <a href="#rocket-tecnologias-utilizadas">Tecnologias</a>&nbsp;|&nbsp;
  <a href="#package-como-baixar-e-executar-o-projeto">Baixar e Executar</a>&nbsp;
</h3>

___

___

## :information_source: Sobre

Nesse desafio nós revisamos os conceitos básicos de NodeJS por meio da contrução de uma API Rest simples que podemos adicionar, remover, editar e dar like em repositórios que são guardados em um array.


1. Chamada HTTP de **listagem de recursos**, nesse caso, a lista de repositórios:
 
    ```js
        app.get("/repositories", (request, response) => {
        return response.json(repositories);
        });
    ```
     - Reposta enviado todos os repositórios no formato json, lembrando que aqui, no back-end vamos trabalhar somente com json 


2. Chamada HTTP de **criação de um novo recurso**, nesse caso, um repositório:
    ```js
            app.post("/repositories", (request, response) => {
            const { title, url, techs } = request.body 

                let repository = {
                    id : uuid(),
                    title,
                    url,
                    techs,
                    likes: 0
                }

                repositories.push(repository)        
                return response.json(repository) 
            });
    ```
     - Recebe is dados do front-end, nesse caso representado pelo Insomnia que os envia pelo body do POST.

3. Middleware que realiza uma validação sobre os id dos repositórios(recursos) para identificar se o id recebido da requisição que será usado ou na edição, ou na deleção ou na funcionalidade de likes está no formato correto:
    ```js
            function validateRequestId(request, response, next) {
            const { id } = request.params;
            
            if (!isUuid(id)) {
                return response.status(400).json({erro: "Invalid Project id"});
            }

            return next();
            }```

4. Chamada de HTTP que realiza a edição de um dos recursos(repositórios) recebendo o id para identificar o recurso que será atualizado:

    ```js     
        app.put("/repositories/:id", (request, response) => {
        const { id } = request.params
        const { title, url, techs } = request.body
        

        //buscando o índice
        const index = repositories.findIndex(repository => repository.id == id)
        
        if (index < 0) {
            return response.status(400).json({
            error: 'Repository not found'
            })
        }

        const likes = repositories[index].likes
        repository = {
            id,
            title,
            url,
            techs,
            likes
        }

        repositories[index] = repository

        return response.json(repository)
        });
    ```
5. Chamada HTTP de remoção de recursos de acordo com o id recebido pela requisição.
    ```js
        app.delete("/repositories/:id", (request, response) => {
        const { id } = request.params;
        
        const index = repositories.findIndex(repository => repository.id == id); 
        
        if (index < 0) {
            return response.status(400).json({
            error: 'Repository not found'})    
        }

        repositories.splice(index, 1); 

        return response.status(204).json();
        });
    ```
6. Chamada HTTP da adição de likes em um repositório(recurso)
    ```js
        app.post("/repositories/:id/like", (request, response) => {
        const { id } = request.params

        const index = repositories.findIndex(repository => repository.id == id)

        if (index < 0) {
            return response.status(400).json({error: 'Repository not found'})    
        }
        
        repositories[index].likes += 1

        return response.json(repositories[index])
        });
    ```
___
## :interrobang: Motivo

Esse desafio consiste em revisar os conceitos iniciais de NodeJS para criação de uma uma API Rest. Assim praticamos o uso de chamadas HTTP, de requisições e respostas junto com a lógica de programação básica.  

___
## :seedling: Requisitos Mínimos
Node.js, Yarn(ou NPM).
___
## :rocket: Tecnologias Utilizadas 

O projeto foi desenvolvido utilizando as seguintes tecnologias

- [Node.js](https://nodejs.org/en/)
- [Insomnia](https://insomnia.rest/download)
- [Yarn](https://classic.yarnpkg.com/blog/2017/05/12/introducing-yarn/)
___
## :package: Como baixar e executar o projeto

  - Clonar o projeto:
    ```bash
     git clone https://github.com/Aszurar/nodejsChallenge.git
    ```
  - É necessário a instalação do yarn de acordo com seu sistema operacional, para isso veja como no site do [Yarn](https://classic.yarnpkg.com/blog/2017/05/12/introducing-yarn/)
 
  - Instalação das dependências:
    - Execute o comando abaixo dentro da pasta do projeto 
    ```bash
      yarn
    ```
 - Execução - Abra a pasta do projeto com alguma IDE(Vscode) ou simplesmente abra o terminal na pasta do projeto e execute o comando abaixo:
    ```bash
       yarn dev
    ```
 -  Por fim, execute com o auxílio do Insomina para realizar as requisições à API
___
Desenvolvido por :star2: Lucas de Lima Martins de Souza.
