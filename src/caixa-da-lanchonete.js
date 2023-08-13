class CaixaDaLanchonete {

    precoItens(item){ //Buscar preços
        const precos = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50
        }

        return precos[item];
    }
    
    calcularValorDaCompra(metodoDePagamento, itens) {
        let total = 0;
        let carrinhoVazio = true;
        let temChantily = false;
        let temCafe = false;
        let temQueijo = false;
        let temSanduiche = false;

        for (const itemQuantidade of itens) { //Calcula valor da compra (item * quantidade)
            const [item, quantidade] = itemQuantidade.split(","); 
            const precoItem = this.precoItens(item.trim());
            total += precoItem * parseInt(quantidade); 
            
            if(item === ""){ //Verificar carrinho vazio
                return "Não há itens no carrinho de compra!";
            }

            else if(quantidade <= 0){ //Verificar quantidade
                return "Quantidade inválida!";
            }

            else if(!this.precoItens(item.trim())){ //Verificar item inválido
                return "Item inválido!";
            }

            else if(item.includes("chantily")){ //Inicio verificar adicionais
                temChantily = true;
            }

            else if(item.includes("cafe")){
                temCafe = true;
            }

            else if(item.includes("queijo")){
                temQueijo = true;
            }

            else if(item.includes("sanduiche")){ //Fim verificar adicionais
                temSanduiche = true;
            }

            carrinhoVazio = false;
        }

        if(carrinhoVazio){
            return "Não há itens no carrinho de compra!";
        }

        if(temChantily && !temCafe || temQueijo && !temSanduiche){ //Condições dos adicionais
            return "Item extra não pode ser pedido sem o principal";
        }
            

        if(metodoDePagamento === "dinheiro"){ //Metodos de pagamento
            const valorDesconto = total - (total * 0.05);
            return `R$ ${valorDesconto.toFixed(2).toString().replace('.', ',')}`;
        }

        else if(metodoDePagamento === "credito"){
            const valorAcrescimo = total + (total * 0.03);
            return `R$ ${valorAcrescimo.toFixed(2).toString().replace('.', ',')}`;
        }

        else if(metodoDePagamento === "debito"){
            return `R$ ${total.toFixed(2).toString().replace('.', ',')}`;
        }

        else{
            return "Forma de pagamento inválida!";
        }
    }
}



export { CaixaDaLanchonete };