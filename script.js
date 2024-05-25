document.addEventListener('DOMContentLoaded', function() {
    const mesBr = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
    const tabelaDias = document.getElementById('dias')
    const sobreEvento = document.getElementById('sobreEvento')
    const detalhesTexto = document.getElementById('detalhes-texto')

    let eventos = {}

    // Função para carregar os eventos do arquivo eventos.json
    function carregarEventos() {
        fetch('eventos.json')
            .then(response => response.json())
            .then(data => {
                eventos = data
                let agora = new Date()
                GetDaysCalendar(agora.getMonth(), agora.getFullYear())
            })
    }

    // Função para obter os dias do calendário de um determinado mês e ano
    function GetDaysCalendar(mes, ano) {
        document.getElementById('mes').innerHTML = mesBr[mes]
        document.getElementById('ano').innerHTML = ano

        let primeiroDiaDaSemana = new Date(ano, mes, 1).getDay()
        if (primeiroDiaDaSemana === 0) {
            primeiroDiaDaSemana = 7
        }
        primeiroDiaDaSemana -= 1

        let getUltimoDiaDoMes = new Date(ano, mes + 1, 0).getDate()

        let hoje = new Date()
        let diaAtual = hoje.getDate()
        let mesAtual = hoje.getMonth()
        let anoAtual = hoje.getFullYear()

        // Loop para preencher os dias no calendário
        for (var i = -primeiroDiaDaSemana, index = 0; i < (42 - primeiroDiaDaSemana); i++, index++) {
            let dt = new Date(ano, mes, i + 1)
            let diaTabela = tabelaDias.getElementsByTagName('td')[index]
            diaTabela.classList.remove('mes_antes', 'mes_depois', 'dia_hoje', 'evento')
            diaTabela.innerHTML = dt.getDate()
            diaTabela.removeAttribute('data-resumo')
            diaTabela.removeAttribute('data-detalhes')

            let dataStr = `${ano}-${(mes + 1).toString().padStart(2, '0')}-${(dt.getDate()).toString().padStart(2, '0')}`

            if (eventos[dataStr]) {
                diaTabela.classList.add('evento')
                diaTabela.setAttribute('data-resumo', eventos[dataStr].resumo)
                diaTabela.setAttribute('data-detalhes', eventos[dataStr].detalhes)
            }

            if (i < 0) {
                diaTabela.classList.add('mes_antes')
            } else if (i >= getUltimoDiaDoMes) {
                diaTabela.classList.add('mes_depois')
            }
            if (dt.getDate() === diaAtual && mes === mesAtual && ano === anoAtual) {
                diaTabela.classList.add('dia_hoje')
            }

            // Exibir o resumo do evento ao passar o mouse sobre o dia
            diaTabela.onmouseover = function() {
                let resumo = diaTabela.getAttribute('data-resumo')
                if (resumo) {
                    let resumoDiv = document.createElement('div')
                    resumoDiv.className = 'resumo-evento'
                    resumoDiv.innerText = resumo
                    diaTabela.appendChild(resumoDiv)
                }
            }

            // Remover o resumo do evento ao tirar o mouse do dia
            diaTabela.onmouseout = function() {
                let resumo = diaTabela.querySelector('.resumo-evento')
                if (resumo) {
                    diaTabela.removeChild(resumo)
                }
            }

            // Mostrar os detalhes do evento ao clicar no dia
            diaTabela.onclick = function() {
                let detalhes = diaTabela.getAttribute('data-detalhes')
                if (detalhes) {
                    detalhesTexto.innerText = detalhes
                } else {
                    detalhesTexto.innerText = "Nenhum evento para este dia."
                }
            }
        }
    }

    let agora = new Date()
    let mes = agora.getMonth()
    let ano = agora.getFullYear()
    
    carregarEventos()

    const botao_prox = document.getElementById('depois')
    const botao_antes = document.getElementById('antes')

    // Avançar para o próximo mês
    botao_prox.onclick = function() {
        mes++
        if (mes > 11) {
            mes = 0
            ano++
        }
        GetDaysCalendar(mes, ano)
    }

    // Voltar para o mês anterior
    botao_antes.onclick = function() {
        mes--
        if (mes < 0) {
            mes = 11
            ano--
        }
        GetDaysCalendar(mes, ano)
    }
})