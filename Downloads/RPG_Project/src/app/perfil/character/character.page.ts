import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-character',
  template: `
    <ion-content [fullscreen]="true" class="ion-no-padding">

      <header class="sticky top-0 z-50 flex items-center justify-between px-4 h-14
                     bg-surface/90 backdrop-blur-xl border-b border-white/10">
        <button (click)="back()" class="p-2 text-primary active:scale-90 transition-transform">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="font-display text-base font-bold text-amber">Criar Personagem</h1>
        <div class="w-10"></div>
      </header>

      <main class="p-5 pb-28 space-y-5">

        <!-- AVATAR -->
        <div class="flex flex-col items-center">
          <div class="avatar-frame">
            <span class="material-symbols-outlined avatar-icon">shield</span>
          </div>
          <h2 class="font-display text-xl font-bold text-white mt-3">
            {{ character.name || 'Herói em Construção' }}
          </h2>
          <p class="text-primary/60 text-sm">
            {{ character.klass ? (character.race ? character.klass + ' · ' + character.race : character.klass) : 'Defina seu destino no Manual Épico' }}
          </p>
        </div>

        <!-- ATRIBUTOS -->
        <div class="glass-card rounded-3xl p-5 border border-white/10">
          <h3 class="section-title">Atributos Iniciais</h3>
          <div class="stats-grid">
            <div class="stat-box"><span>⚔</span><strong>10</strong><small>Ataque</small></div>
            <div class="stat-box"><span>🛡</span><strong>10</strong><small>Defesa</small></div>
            <div class="stat-box"><span>❤</span><strong>100</strong><small>Vida</small></div>
            <div class="stat-box"><span>✨</span><strong>5</strong><small>Magia</small></div>
          </div>
        </div>

        <!-- FORMULÁRIO -->
        <div class="glass-card rounded-3xl p-5 border border-white/10">
          <h2 class="font-display text-lg font-semibold text-white mb-4">Construa seu Herói</h2>

          <div class="space-y-4">
            <div class="field-group">
              <label>Nome do Personagem</label>
              <input type="text" placeholder="Digite um nome épico..." [(ngModel)]="character.name" class="field-input"/>
            </div>

            <div class="field-group">
              <label>Classe</label>
              <input type="text" placeholder="Guerreiro, Mago, Ladino..." [(ngModel)]="character.klass" class="field-input"/>
            </div>

            <div *ngIf="character.klass" class="info-card">
              <h3 class="section-title">Arquétipo</h3>
              <p>{{ character.klass }} — define suas habilidades e papel nas aventuras.</p>
            </div>

            <div class="field-group">
              <label>Raça</label>
              <input type="text" placeholder="Humano, Elfo, Anão..." [(ngModel)]="character.race" class="field-input"/>
            </div>

            <div class="field-group">
              <label>História de Origem</label>
              <textarea rows="4" placeholder="Conte a origem do personagem..." [(ngModel)]="character.background" class="field-input resize-none"></textarea>
            </div>
          </div>
        </div>

        <!-- RESUMO -->
        <div class="glass-card rounded-3xl p-5 border border-white/10" *ngIf="character.name || character.klass">
          <h3 class="section-title">Resumo do Herói</h3>
          <p *ngIf="character.name"><strong>Nome:</strong> {{ character.name }}</p>
          <p *ngIf="character.klass"><strong>Classe:</strong> {{ character.klass }}</p>
          <p *ngIf="character.race"><strong>Raça:</strong> {{ character.race }}</p>
          <p *ngIf="character.background"><strong>Origem:</strong> {{ character.background }}</p>
        </div>

        <!-- BOTÃO -->
        <button (click)="save()" class="save-btn" [disabled]="!character.name">
          <span class="material-symbols-outlined">save</span>
          {{ saved ? 'Personagem Salvo! ✓' : 'Salvar Personagem' }}
        </button>

      </main>

    </ion-content>
  `,
  styles: [`
    ion-content { --background:#07101f; --color:#d4e4fa; }
    .glass-card { background:rgba(15,23,42,.75); backdrop-filter:blur(12px); }
    .avatar-frame { width:120px; height:120px; border-radius:28px; display:flex; align-items:center; justify-content:center; background:rgba(249,115,22,.12); border:1px solid rgba(249,115,22,.25); }
    .avatar-icon { font-size:68px; color:#f59e0b; }
    .section-title { color:#f59e0b; font-size:.75rem; font-weight:700; text-transform:uppercase; letter-spacing:.15em; margin-bottom:12px; }
    .stats-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; }
    .stat-box { text-align:center; padding:14px; border-radius:16px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08); }
    .stat-box strong { display:block; color:white; font-size:1.3rem; margin-top:4px; }
    .stat-box small { color:rgba(212,228,250,.6); }
    .info-card { padding:14px; border-radius:16px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08); color:#d4e4fa; }
    .field-group { display:flex; flex-direction:column; gap:6px; }
    .field-group label { color:rgba(212,228,250,.7); font-size:13px; font-weight:600; }
    .field-input { width:100%; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1); border-radius:12px; padding:12px 14px; color:white; font-size:14px; outline:none; box-sizing:border-box; }
    .field-input::placeholder { color:rgba(212,228,250,.3); }
    .field-input:focus { border-color:rgba(245,158,11,.5); }
    .save-btn { width:100%; padding:16px; border:none; border-radius:24px; background:#f59e0b; color:#1f2937; font-weight:700; font-size:1rem; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; transition: opacity .2s; }
    .save-btn:disabled { opacity:.5; cursor:not-allowed; }
    .save-btn .material-symbols-outlined { font-size:20px; }
    p { color:rgba(212,228,250,.8); margin-bottom:6px; }
    strong { color:#f59e0b; }
  `],
  standalone: false,
})
export class CharacterPage {
  private location = inject(Location);
  private navCtrl = inject(NavController);

  character = { name: '', klass: '', race: '', background: '' };
  saved = false;

  ngOnInit() {
    try {
      const raw = localStorage.getItem('epic:character');
      if (raw) this.character = JSON.parse(raw);
    } catch {}
  }

  back() { this.location.back(); }

  save() {
    if (!this.character.name) return;
    try { localStorage.setItem('epic:character', JSON.stringify(this.character)); } catch {}
    this.saved = true;
    setTimeout(() => this.saved = false, 3000);
  }
}
