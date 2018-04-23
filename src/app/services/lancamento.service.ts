import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lancamento } from '../entities/lancamento';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LancamentoService {

  constructor(private http: HttpClient) { }

  cadastrarLancamento(lancamento: Lancamento){
    this.http.post<Lancamento>('url', lancamento);
  }

  buscarLancamentos(): Observable<Lancamento[]>{
    return this.http.get<Lancamento[]>('url');
  }
}
