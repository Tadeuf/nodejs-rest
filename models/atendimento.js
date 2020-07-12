const conexao = require ('../infraestrutura/conexao')
const moment = require ('moment')
const formatoFechaHora = 'YYYY-MM-DD HH:MM:SS'

class Atendimento {
    adiciona(atendimento,res){
        const dataCriacao = moment().format(formatoFechaHora)
        const dataServico = moment(atendimento.dataServico, 'DD/MM/YYYY').format(formatoFechaHora)
        
        const dataEhValida = moment(dataServico).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >= 5
        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data do Servico deve ser maior ou igual a Data atual.'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos 5 caracteres.'
            }
        ]
        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        }else {
            const atendimentoDatado = {...atendimento, dataCriacao, dataServico}
            const sql = 'INSERT INTO atendimento SET ?'
            console.log ( 'atendimentoDatado ' + atendimentoDatado)
            conexao.query (sql, atendimentoDatado, (erro, resultados) => {
                if (erro){
                    res.status(400).json(erro)
                } else {
                    res.status(201).json({...atendimentoDatado})
                }
            });
        }
    }

    lista(res){
        const sql = 'Select * from atendimento'
        conexao.query(sql,(erro,resultados) => {
            if (erro){
                res.status(400).json(erro)
            } else {
                res.status(201).json(resultados)
            }
        })
    }
    buscaPorId(id, res){
        const sql = 'Select * from atendimento where id = ?'
        conexao.query(sql, id, (erro,resultados) => {
            const atendimento = resultados[0]
            if (erro){
                res.status(400).json(erro)
            } else {
                res.status(201).json(atendimento)
            }
        })
    }
    altera(id, valores, res){
        if (valores.dataServico){
            valores.dataServico = moment(valores.dataServico, 'DD/MM/YYYY').format(formatoFechaHora)
        }
        const sql = 'Update atendimento Set ? where id = ?'
        conexao.query(sql, [valores, id], (erro,resultados) => {
            if (erro){
                res.status(400).json(erro)
            } else {
                res.status(201).json({...valores, id})
            }
        })
    }

    deleta(id, res){
        const sql = 'DELETE from atendimento where id = ?'
        conexao.query(sql, id, (erro,resultados) => {
            if (erro){
                res.status(400).json(erro)
            } else {
                res.status(201).json({id})
            }
        })
    }
}
module.exports = new Atendimento