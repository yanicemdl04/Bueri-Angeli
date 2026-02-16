import { motion } from 'framer-motion'
import {
  Activity,
  Bell,
  Brain,
  Database,
  Lock,
  Presentation,
  Users,
  BarChart3
} from 'lucide-react'
import PageTransition from '../components/PageTransition'
import SectionHeader from '../components/SectionHeader'
import FeatureCard from '../components/FeatureCard'
import ImagePanel from '../components/ImagePanel'
import StatCard from '../components/StatCard'
import PrimaryButton from '../components/PrimaryButton'
import { getImageByCategory, images } from '../data/images'
import { globalStats } from '../data/metrics'

const LandingPage = () => {
  const heroImage = getImageByCategory('hero') 
  const innovationImage = getImageByCategory('innovation')
  const elevesImage = getImageByCategory('eleves')
  const enseignantsImage = getImageByCategory('enseignants')
  const classesImage = getImageByCategory('classes')
  const campusImage = getImageByCategory('campus')
  const otherImages = images.filter((image) => image.src !== heroImage.src)

  const features = [
    {
      title: 'Gestion 360° des élèves',
      description:
        "Dossier complet, suivi des performances, historique scolaire et indicateurs d'engagement.",
      icon: <Users size={20} />
    },
    {
      title: 'Notes & moyennes pondérées',
      description:
        'Calcul automatique des moyennes par cours, classe et période avec pondération.',
      icon: <BarChart3 size={20} />
    },
    {
      title: 'Score IA décrochage',
      description:
        "Prédiction proactive des risques et alertes ciblées pour l'équipe pédagogique.",
      icon: <Brain size={20} />
    },
    {
      title: 'Communication instantanée',
      description: 'Notifications multicanal pour parents, enseignants et administration.',
      icon: <Bell size={20} />
    },
    {
      title: 'Sécurité RBAC',
      description: 'Accès sécurisé par rôle, audit et confidentialité renforcée.',
      icon: <Lock size={20} />
    },
    {
      title: 'Analytics premium',
      description: 'Tableaux de bord interactifs, tendances et comparaisons dynamiques.',
      icon: <Activity size={20} />
    }
  ]

  const modules = [
    {
      title: 'Dashboard Admin',
      description: 'Pilotage global, statistiques, gestion complète des ressources.',
      icon: <Presentation size={20} />
    },
    {
      title: 'Dashboard Enseignant',
      description: 'Classes, encodage notes, suivi individualisé par élève.',
      icon: <Database size={20} />
    },
    {
      title: 'Dashboard Parent',
      description: "Bulletin en temps réel et suivi de la progression de l'enfant.",
      icon: <Users size={20} />
    }
  ]

  return (
    <PageTransition>
      <section className="relative overflow-hidden bg-midnight">
        <div className="absolute inset-0 opacity-30">
          <img src={heroImage.src} alt={heroImage.title} className="h-full w-full object-cover" />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-sky-100/70">
              Système d'information scolaire
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
              SIS Bueri Angeli, la gestion académique en mode premium.
            </h1>
            <p className="mt-6 text-lg text-slate-200">
              Une plateforme moderne, sécurisée et intelligente pour connecter élèves,
              enseignants et parents avec des indicateurs IA et des workflows fluides.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <PrimaryButton href="/login">Accéder au portail</PrimaryButton>
              <button
                type="button"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-sky-blue/60"
              >
                Demander une démo
              </button>
            </div>
          </motion.div>
          <div className="grid gap-4 md:grid-cols-4">
            {globalStats.map((stat) => (
              <StatCard key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>
      </section>

      <section id="solution" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-10">
            <SectionHeader
              kicker="Vision digitale"
              title="Une expérience immersive, fiable et intelligente."
              subtitle="Le SIS centralise toutes les opérations académiques, accélère les décisions et renforce la qualité pédagogique."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <ImagePanel
              src={elevesImage.src}
              title="Suivi élève personnalisé"
              subtitle="Profil complet, indicateurs IA et progression en temps réel."
            />
            <ImagePanel
              src={enseignantsImage.src}
              title="Pilotage pédagogique"
              subtitle="Vues par classe, encodage agile et synthèses automatiques."
            />
          </div>
        </div>
      </section>

      <section id="modules" className="bg-midnight/70">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeader
            kicker="Modules SIS"
            title="Des dashboards adaptés à chaque rôle."
            subtitle="Admin, Enseignant, Parent : chaque profil obtient une interface ciblée et sécurisée."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {modules.map((module) => (
              <FeatureCard key={module.title} {...module} />
            ))}
          </div>
        </div>
      </section>

      <section id="innovation" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <ImagePanel
            src={innovationImage.src}
            title="IA prédictive intégrée"
            subtitle="Score de risque, insights intelligents et recommandations proactives."
          />
          <div className="space-y-8">
            <SectionHeader
              kicker="IA & Innovation"
              title="Anticiper le décrochage avant qu'il n'apparaisse."
              subtitle="Les analyses avancées croisent notes, présence simulée et comportement pour prioriser les interventions."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {otherImages.slice(0, 4).map((image) => (
                <ImagePanel
                  key={image.src}
                  src={image.src}
                  title={image.title}
                  subtitle="Images scénarisées automatiquement selon leur thématique."
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="galerie" className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeader
          kicker="Galerie SIS"
          title="Toutes les images clés de la plateforme."
          subtitle="Les visuels sont répartis automatiquement selon leurs thématiques."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherImages.map((image) => (
            <ImagePanel
              key={image.src}
              src={image.src}
              title={image.title}
              subtitle="Section immersive liée au SIS."
            />
          ))}
        </div>
      </section>

      <section id="dashboards" className="bg-midnight/70">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeader
            kicker="Expérience utilisateur"
            title="Des vues élégantes, animées et ultra claires."
            subtitle="Chaque dashboard combine données clés, micro-interactions et graphes animés."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <ImagePanel
              src={classesImage.src}
              title="Vision classes & cours"
              subtitle="Management complet des classes, cours, enseignants et évaluations."
            />
            <ImagePanel
              src={campusImage.src}
              title="Communication école-parents"
              subtitle="Notifications ciblées et suivi transparent des performances."
            />
            <ImagePanel
              src={otherImages[4]?.src ?? enseignantsImage.src}
              title="Sécurité & conformité"
              subtitle="Contrôle d'accès strict et historique complet des opérations."
            />
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 py-10 text-sm text-slate-400">
        SIS Bueri Angeli — Plateforme académique premium et sécurisée.
      </footer>
    </PageTransition>
  )
}

export default LandingPage
