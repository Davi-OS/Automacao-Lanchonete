class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {

        // vetor de objetos representando os itens do cardapio
        var cardapio = [{
            "codigo": "cafe",
            "valor": 3.00,
            "dependenciaStatus": false,
            "descricao": "Café",
            "itemDependencia": "nenhum"
        }, {
            "codigo": "chantily",
            "valor": 1.50,
            "dependenciaStatus": true,
            "descricao": "Chantily (extra do Café)",
            "itemDependencia": "cafe"

        },
        {
            "codigo": "suco",
            "valor": 6.20,
            "dependenciaStatus": false,
            "descricao": "Suco Natural",
            "itemDependencia": "nenhum"
        },
        {
            "codigo": "sanduiche",
            "valor": 6.50,
            "dependenciaStatus": false,
            "descricao": "Sanduíche",
            "itemDependencia": "nenhum"
        }, {
            "codigo": "queijo",
            "valor": 2.00,
            "dependenciaStatus": true,
            "descricao": "Queijo (extra do Sanduíche)",
            "itemDependencia": "sanduiche"
        }, {
            "codigo": "salgado",
            "valor": 7.25,
            "dependenciaStatus": false,
            "descricao": "Salgado",
            "itemDependencia": "nenhum"
        }, {
            "codigo": "combo1",
            "valor": 9.50,
            "dependenciaStatus": false,
            "descricao": "1 Suco e 1 Sanduíche",
            "itemDependencia": "nenhum"
        }, {
            "codigo": "combo2",
            "valor": 7.50,
            "dependenciaStatus": false,
            "descricao": "	1 Café e 1 Sanduíche",
            "itemDependencia": "nenhum"
        }];

        // vetor de objetos representando os meios de pagamento
        var meiosDePagamento = [{
            "metodo": "dinheiro",
            "descricao": "Pagamento em dinheiro tem 5% de desconto",
            "preocessarPagamento": function (conta) {
                let valorAPagar = conta - (conta* 5)/100;
                let resp = "R$ " + (valorAPagar.toFixed(2)).replace('.', ',');
                return resp;
            }
        }, {
            "metodo": "debito",
            "descricao": "Pagamento sem modificação",
            "preocessarPagamento": function (conta) {
                let valorAPagar = conta * 1;
                let resp = "R$ " + (valorAPagar.toFixed(2)).replace('.', ',');
                return resp;
            }

        }, {
            "metodo": "credito",
            "descricao": "Pagamento a crédito tem acréscimo de 3% no valor total",
            "preocessarPagamento": function (conta) {
                let valorAPagar = conta + (conta*3)/100;
                let resp = "R$ " + (valorAPagar.toFixed(2)).replace('.', ',');
                return resp;
            }
        },];

        // iniciando o valor da conta
        let conta = 0;

        // procura e testa se o metodo de pagamento existe
        const objPagamento = meiosDePagamento.find((meio => meio.metodo === metodoDePagamento));
        if (objPagamento === undefined) {
            return "Forma de pagamento inválida!";
        }

        //testa se o carrinho esta vazio
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }
        
        //operacoes no vetor string informado
        for (let index = 0; index < itens.length; index++) {
            let strComando = itens[index].split(',');
            let item = strComando[0];
            let quantidade = strComando[1];

            //validação de item e quantidade do pedido
            if (quantidade === "0") {
                return "Quantidade inválida!"
            }

            //procura o item pedido no vetor de cardapio
            const objItem = cardapio.find((element) => element.codigo === item);

            // testa se o item do pedido existe no cardapio
            if (objItem != undefined) {

                // verifica se o item possui um status de dependencia ativo
                if (objItem.dependenciaStatus) {

                    // verifica se o item principal esta no pedido
                    if (procuraItemPrincipal(objItem, itens)) {

                        //soma o a multiplicação (valor unitario X quantidade pedida) para a variavel conta
                        conta += ((objItem.valor) * quantidade);
                    } else {
                        return "Item extra não pode ser pedido sem o principal";
                    }
                } else {

                    //soma o a multiplicação (valor unitario X quantidade pedida) para a variavel conta
                    conta += ((objItem.valor) * quantidade);
                }

            } else {
                return "Item inválido!";
            }
        }

        // processando o pagamento do cliente
        let resp = objPagamento.preocessarPagamento(conta);


        function procuraItemPrincipal(objItem, itens) {
            for (let index = 0; index < itens.length; index++) {
                if (itens[index].includes(objItem.itemDependencia)) {
                    return true;
                }
            }
            return false;
        }

        return resp;
    }
}

export { CaixaDaLanchonete };
