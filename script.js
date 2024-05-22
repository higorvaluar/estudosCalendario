document.addEventListener('DOMContentLoaded', function() {
    // Nome dos meses de Janeiro a Dezembro
    const mesBr = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
    const tabelaDias = document.getElementById('dias')

    // Função para pegar os dias do calendário de um mês e ano
    function GetDaysCalendar(mes, ano) {
        // Atualiza o nome do mês e o ano exibidos no cabeçalho do calendário
        document.getElementById('mes').innerHTML = mesBr[mes]
        document.getElementById('ano').innerHTML = ano

        // Calcula o dia da semana do primeiro dia do mês
        let primeiroDiaDaSemana = new Date(ano, mes, 1).getDay()
        if (primeiroDiaDaSemana === 0) {
            primeiroDiaDaSemana = 7
        }

        primeiroDiaDaSemana -= 1

        // Pega o último dia do mês
        let getUltimoDiaDoMes = new Date(ano, mes + 1, 0).getDate()

        // Pega a data atual para ter o dia de hoje
        let hoje = new Date()
        let diaAtual = hoje.getDate()
        let mesAtual = hoje.getMonth()
        let anoAtual = hoje.getFullYear()

        // Preenche as tabelas com os dias do mês
        for (var i = -primeiroDiaDaSemana, index = 0; i < (42 - primeiroDiaDaSemana); i++, index++) {
            let dt = new Date(ano, mes, i + 1)
            let dtAgora = new Date()
            let diaTabela = tabelaDias.getElementsByTagName('td')[index]
            diaTabela.classList.remove('mes_antes', 'mes_depois', 'dia_hoje')
            diaTabela.innerHTML = dt.getDate()
            
            // Add classes para os dias do mês anterior, do próximo e para o dia atual
            if (i < 0){
                diaTabela.classList.add('mes_antes')
            }
            else if (i >= getUltimoDiaDoMes) {
                diaTabela.classList.add('mes_depois')
            }
            if (dt.getDate() === diaAtual && mes === mesAtual && ano === anoAtual) {
                diaTabela.classList.add('dia_hoje')
            }
        }
    }

    // Pega o mês e o ano atual
    let agora = new Date()
    let mes = agora.getMonth()
    let ano = agora.getFullYear()    

    // Chama a função para mostrar os dias do mês atual
    GetDaysCalendar(mes, ano)

    // Adiciona 'event listeners' (funções que esperam por eventos específicos do HTML) para os botões de navegação do calendário.
    const botao_prox = document.getElementById('depois')
    const botao_antes = document.getElementById('antes')

    // Avançar para o próximo mês
    botao_prox.onclick = function(){
        mes++
        if(mes > 11){
            mes = 0
            ano++
        }
        GetDaysCalendar(mes, ano)
    }

    // Voltar um mês
    botao_antes.onclick = function(){
        mes--
        if(mes < 0){
            mes = 11
            ano--
        }
        GetDaysCalendar(mes, ano)
    }
})