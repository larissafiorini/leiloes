import { Component, OnInit, Input } from '@angular/core';
import { Produto } from '../entities/produto';
import { Lancamento } from '../entities/lancamento';
import { LancamentoService } from '../services/lancamento.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-leilao',
  templateUrl: './leilao.component.html',
  styleUrls: ['./leilao.component.css']
})
export class LeilaoComponent implements OnInit {


  ultimoLancamento: Lancamento;

  constructor(
    private lancamentoService: LancamentoService,
    private http: HttpClient) {
   }

  @Input()
  produto: Produto;
  lancamentos: Lancamento[]
  lancamento: Lancamento = new Lancamento();

  ngOnInit() {
    this.lancamentoService.buscarLancamentos().subscribe(
      response => {
        this.lancamentos = response;
        console.log (this.lancamentos);
      }
    )
    this.lancamento.nomeProduto = this.produto.produto;
    let interval = setInterval(() => {
      this.realTime();
    }, 1000);
  }

  fazerLancamento(){
    this.lancamentoService.cadastrarLancamento(this.lancamento).subscribe(
      response => {
        // alert("Lancamento efetuado com sucesso!");
      },
      error => {
        alert("Erro");
      }
    )
  }

  realTime() {
      console.log("entrou");
      // setTimeout(function () {}, 1000);
        this.lancamentoService.ultimoLancamento().subscribe(
          response => {
            debugger;
              if(!this.ultimoLancamento
              || response['lance'].valor !== this.ultimoLancamento.valor
              || response['lance'].nomeProduto !== this.ultimoLancamento.nomeProduto
              || response['lance'].nomeComprador !== this.ultimoLancamento.nomeComprador) {
                console.log(response);
                alert("Comprador " + response['lance'].nomeComprador + " fez lançamento de R$ " + response['lance'].valor + " para o produto " + response['lance'].nomeProduto);
                this.ultimoLancamento = response['lance'];
                console.log(this.ultimoLancamento)
              }
          },
          error => {
            console.log("ainda não emitido")
          }
        );
    // }, 5000);
  }
}
