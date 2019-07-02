---
    Título: "Manual de manutenção"
    Software: "To: Event"
    Ultima Alteração: "02/07/2019"
    Author: "Alan Lucas Silva de Castro"
    Versão: "1.0"
---

# Observações

Se houver qualquer inconsistência no manual, crie um novo documento. 

<h1 class="someclass" id="someid" markdown="1">
    Insert markdown here
</h1>

# Manual de manutenção

Com o intuito de utilizar o sistema toEvent para diversos eventos dentro da UFMS, foi escrito esse manual de manutenção. As ferramentas que precisam estar instaladas para executar o projeto base são: [Nodejs](https://nodejs.org/en/) e [NPM](https://www.npmjs.com/) (a instalação do Nodejs e NPM são feitos no mesmo executável). O site para baixar o Nodejs é o seguinte: https://nodejs.org/en/.

O toEvent é um sistema que utiliza a hospedagem de páginas estáticas do [Github](https://github.com) e como armazenamento de informação o sistema do google [Firebase](https://firebase.google.com/). Outro ponto importante é que o [Github](https://github.com) é também utilizado para o armazenamento e versionamento do projeto. Por isso é necessário que crie uma conta em cada uma plataforma.

## Primeiros Passos

Depois de instalar as ferramentas necessárias e criar as contas, é necessário adicionar um projeto na conta [Firebase](https://firebase.google.com/).

* Adicione um projeto;

![Adicionar um projeto](https://github.com/LaDeSP/ToEvent/blob/master/maintenace/addProject_firebase.png?raw=true)

* Coloque o nome do projeto;

![Adicionar um nome para o projeto](https://github.com/LaDeSP/ToEvent/blob/master/maintenace/nameProject_firebase.png?raw=true)

* Troque a localização do Analytics para Brasil;

![Mudando a localiação do Analytics](https://github.com/LaDeSP/ToEvent/blob/master/maintenace/localization_firebase.png?raw=true)

* Aceite os termos;
* Clique em criar projeto;

![Aceitando os termos](https://github.com/LaDeSP/ToEvent/blob/master/maintenace/createProject_firebase.png?raw=true)

* Espere a criação do projeto;

![Tela de Espera](https://github.com/LaDeSP/ToEvent/blob/master/maintenace/wait_firebase.png?raw=true)

* Feche a janela de adicionar projeto;
* E espere aparecer a tela do projeto.

![Aceitando os termos](https://github.com/LaDeSP/ToEvent/blob/master/maintenace/projectPage_firebase.png?raw=true)

