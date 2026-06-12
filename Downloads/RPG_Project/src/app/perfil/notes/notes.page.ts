import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-notes',
  template: `
    <ion-content [fullscreen]="true" class="ion-no-padding">

      <header class="page-header">
        <button (click)="back()" class="icon-btn">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="page-title">Minhas Anotações</h1>
        <div class="header-space"></div>
      </header>

      <main class="page-content">

        <section class="hero-card">
          <div class="hero-icon">
            <span class="material-symbols-outlined">edit_note</span>
          </div>
          <h2>Diário de Aventuras</h2>
          <p>Registre ideias, campanhas, NPCs, mistérios e tudo que surgir durante suas jornadas.</p>
        </section>

        <section class="glass-card stats-card">
          <div class="stat-box">
            <div class="stat-value">{{ notes.length }}</div>
            <div class="stat-label">Caracteres</div>
          </div>
          <div class="stat-box">
            <div class="stat-value">{{ wordCount }}</div>
            <div class="stat-label">Palavras</div>
          </div>
        </section>

        <section class="glass-card notes-card">
          <h3>Bloco de Notas</h3>
          <textarea
            rows="14"
            placeholder="Descreva personagens, histórias, missões, locais ou qualquer informação importante..."
            [(ngModel)]="notes"
            class="notes-textarea">
          </textarea>
        </section>

        <button (click)="save()" class="save-btn">
          <span class="material-symbols-outlined">save</span>
          {{ saved ? 'Anotações Salvas! ✓' : 'Salvar Anotações' }}
        </button>

      </main>

    </ion-content>
  `,
  styles: [`
    ion-content { --background:#051424; --color:#d4e4fa; }
    .page-header { position:sticky; top:0; z-index:50; height:56px; display:flex; align-items:center; justify-content:space-between; padding:0 16px; background:rgba(5,20,36,.85); backdrop-filter:blur(18px); border-bottom:1px solid rgba(255,255,255,.05); }
    .page-title { color:#ffffff; font-size:16px; font-weight:700; }
    .icon-btn { color:#d4e4fa; padding:8px; cursor:pointer; background:none; border:none; }
    .header-space { width:40px; }
    .page-content { padding:20px; padding-bottom:120px; display:flex; flex-direction:column; gap:18px; }
    .glass-card { background:rgba(13,28,45,.65); backdrop-filter:blur(14px); border:1px solid rgba(255,255,255,.06); border-radius:24px; }
    .hero-card { text-align:center; padding:28px 20px; border-radius:28px; background:linear-gradient(180deg,rgba(245,158,11,.15),rgba(13,28,45,.75)); border:1px solid rgba(245,158,11,.2); }
    .hero-icon { width:90px; height:90px; margin:auto auto 16px; border-radius:24px; background:rgba(245,158,11,.15); display:flex; align-items:center; justify-content:center; }
    .hero-icon span { font-size:48px; color:#f59e0b; }
    .hero-card h2 { color:white; font-size:22px; font-weight:700; margin-bottom:10px; }
    .hero-card p { color:rgba(212,228,250,.7); line-height:1.7; }
    .stats-card { padding:20px; display:grid; grid-template-columns:1fr 1fr; gap:12px; }
    .stat-box { text-align:center; padding:16px; background:rgba(255,255,255,.03); border-radius:18px; }
    .stat-value { color:#f59e0b; font-size:28px; font-weight:700; }
    .stat-label { color:rgba(212,228,250,.5); font-size:12px; text-transform:uppercase; letter-spacing:.12em; }
    .notes-card { padding:20px; }
    .notes-card h3 { color:#f59e0b; margin-bottom:16px; font-size:14px; text-transform:uppercase; letter-spacing:.15em; }
    .notes-textarea { width:100%; background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.08); border-radius:18px; padding:16px; color:white; font-size:14px; line-height:1.7; outline:none; box-sizing:border-box; resize:none; font-family:inherit; }
    .notes-textarea::placeholder { color:rgba(212,228,250,.3); }
    .notes-textarea:focus { border-color:rgba(245,158,11,.4); }
    .save-btn { width:100%; height:54px; border:none; border-radius:18px; background:#f59e0b; color:#1f2937; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; font-size:1rem; }
    .save-btn .material-symbols-outlined { font-size:20px; }
  `],
  standalone: false,
})
export class NotesPage {
  private location = inject(Location);
  private navCtrl = inject(NavController);
  notes = '';
  saved = false;

  get wordCount() {
    return this.notes.trim() ? this.notes.trim().split(/\s+/).length : 0;
  }

  ngOnInit() {
    try {
      const raw = localStorage.getItem('epic:notes');
      if (raw) this.notes = raw;
    } catch {}
  }

  back() { this.location.back(); }

  save() {
    try { localStorage.setItem('epic:notes', this.notes); } catch {}
    this.saved = true;
    setTimeout(() => this.saved = false, 3000);
  }
}
