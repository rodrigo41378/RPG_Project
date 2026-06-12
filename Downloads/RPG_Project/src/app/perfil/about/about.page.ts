import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-about',
  template: `
    <ion-content [fullscreen]="true" class="ion-no-padding">

      <!-- HEADER -->
      <header class="sticky top-0 z-50 flex items-center justify-between px-4 py-3 page-header">
        <button (click)="back()" class="icon-btn">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>

        <h1 class="page-title">
          Sobre o Manual
        </h1>

        <div class="w-10"></div>
      </header>

      <main class="page-content">

        <!-- HERO -->
        <section class="hero-card">

          <div class="hero-icon">
            <span class="material-symbols-outlined">
              auto_stories
            </span>
          </div>

          <h2>Manual Épico</h2>

          <p>
            Um compêndio digital criado para reunir criaturas,
            tesouros, regiões, divindades e referências de RPG
            em uma única experiência moderna.
          </p>

        </section>

        <!-- SOBRE -->
        <section class="glass-card info-card">

          <h3>Sobre o Projeto</h3>

          <p>
            Este aplicativo foi desenvolvido para servir como uma
            biblioteca de consulta rápida para mestres e jogadores.
          </p>

          <p>
            O objetivo é tornar a exploração do universo RPG mais
            agradável, organizada e visualmente envolvente.
          </p>

        </section>

        <!-- FUNCIONALIDADES -->
        <section class="glass-card info-card">

          <h3>Recursos Disponíveis</h3>

          <div class="feature-list">

            <div class="feature-item">
              <span class="material-symbols-outlined text-amber">
                pets
              </span>
              <span>Bestiário de Criaturas</span>
            </div>

            <div class="feature-item">
              <span class="material-symbols-outlined text-amber">
                diamond
              </span>
              <span>Tesouros e Artefatos</span>
            </div>

            <div class="feature-item">
              <span class="material-symbols-outlined text-amber">
                public
              </span>
              <span>Reinos e Regiões</span>
            </div>

            <div class="feature-item">
              <span class="material-symbols-outlined text-amber">
                auto_fix_high
              </span>
              <span>Panteão de Divindades</span>
            </div>

            <div class="feature-item">
              <span class="material-symbols-outlined text-amber">
                bookmark
              </span>
              <span>Sistema de Favoritos</span>
            </div>

            <div class="feature-item">
              <span class="material-symbols-outlined text-amber">
                edit_note
              </span>
              <span>Anotações de Campanha</span>
            </div>

          </div>

        </section>

        <!-- STATUS -->
        <section class="glass-card version-card">

          <div class="version-label">
            Versão Atual
          </div>

          <div class="version-number">
            1.0.0
          </div>

          <p>
            Primeira versão funcional do Manual Épico.
          </p>

        </section>

      </main>

    </ion-content>
  `,
  styles: [`

    ion-content{
      --background:#051424;
      --color:#d4e4fa;
    }

    .page-header{
      background:rgba(5,20,36,.85);
      backdrop-filter:blur(18px);
      border-bottom:1px solid rgba(255,255,255,.05);
    }

    .icon-btn{
      color:#d4e4fa;
      padding:8px;
    }

    .page-title{
      color:#f59e0b;
      font-size:16px;
      font-weight:700;
    }

    .page-content{
      padding:20px;
      padding-bottom:120px;
      display:flex;
      flex-direction:column;
      gap:18px;
    }

    .glass-card{
      background:rgba(13,28,45,.65);
      backdrop-filter:blur(14px);
      border:1px solid rgba(255,255,255,.06);
      border-radius:24px;
    }

    .hero-card{
      text-align:center;
      padding:30px 20px;
      background:linear-gradient(
        180deg,
        rgba(245,158,11,.15),
        rgba(13,28,45,.75)
      );
      border:1px solid rgba(245,158,11,.2);
      border-radius:28px;
    }

    .hero-icon{
      width:90px;
      height:90px;
      margin:auto;
      border-radius:24px;
      background:rgba(245,158,11,.15);
      display:flex;
      align-items:center;
      justify-content:center;
      margin-bottom:18px;
    }

    .hero-icon span{
      font-size:48px;
      color:#f59e0b;
    }

    .hero-card h2{
      color:white;
      font-size:24px;
      font-weight:700;
      margin-bottom:10px;
    }

    .hero-card p{
      color:rgba(212,228,250,.7);
      line-height:1.7;
    }

    .info-card{
      padding:20px;
    }

    .info-card h3{
      color:#f59e0b;
      font-size:14px;
      text-transform:uppercase;
      letter-spacing:.15em;
      margin-bottom:16px;
    }

    .info-card p{
      color:rgba(212,228,250,.75);
      line-height:1.8;
      margin-bottom:12px;
    }

    .feature-list{
      display:flex;
      flex-direction:column;
      gap:14px;
    }

    .feature-item{
      display:flex;
      align-items:center;
      gap:12px;
      color:white;
      font-size:14px;
    }

    .version-card{
      text-align:center;
      padding:24px;
    }

    .version-label{
      color:#94a3b8;
      font-size:12px;
      text-transform:uppercase;
      letter-spacing:.2em;
    }

    .version-number{
      font-size:34px;
      font-weight:800;
      color:#f59e0b;
      margin:10px 0;
    }

    .version-card p{
      color:rgba(212,228,250,.6);
      font-size:14px;
    }

  `],
  standalone: false,
})
export class AboutPage {

  private location = inject(Location);
  private navCtrl = inject(NavController);

  back() {
    this.location.back();
  }

}