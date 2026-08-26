import { useState } from 'react'
import { LayoutGroup } from 'framer-motion'
import PortfolioHub from './components/hub/PortfolioHub'
import ProjectModal from './components/modal/ProjectModal'
import AmyCaseStudy, { AmyCaseStudyBreakout } from './components/modal/AmyCaseStudy'
import GalgalatzCaseStudy, { GalgalatzBreakout } from './components/modal/GalgalatzCaseStudy'
import AiRescueCaseStudy, { AiRescueBreakout } from './components/modal/AiRescueCaseStudy'
import PeopleMotionCaseStudy, { PeopleMotionBreakout } from './components/modal/PeopleMotionCaseStudy'
import type { ProjectId, Theme } from './types'
import { asset } from './lib/asset'

const THEME: Record<ProjectId, Theme> = {
  amy: 'light',
  galgalatz: 'dark',
  'ai-rescue': 'dark',
  'people-motion': 'light',
}

const LABEL_ID: Record<ProjectId, string> = {
  amy: 'modal-amy-title',
  galgalatz: 'modal-galgalatz-title',
  'ai-rescue': 'modal-ai-title',
  'people-motion': 'modal-motion-title',
}

export default function App() {
  const [openId, setOpenId] = useState<ProjectId | null>(null)
  const close = () => setOpenId(null)

  return (
    // LayoutGroup gives the homepage cards and the modal panel — two
    // separate parts of the tree — a shared reconciliation context, so a
    // card and the modal can carry the same `layoutId` and Framer Motion
    // will animate the FLIP between them (the "card expands into the case
    // study" transition) instead of them being unrelated components.
    <LayoutGroup>
      <PortfolioHub onOpen={setOpenId} openId={openId} />

      <ProjectModal
        open={openId !== null}
        onClose={close}
        theme={openId ? THEME[openId] : 'light'}
        labelledBy={openId ? LABEL_ID[openId] : ''}
        arcadeChrome={openId === 'amy'}
        outlineClose={openId === 'galgalatz'}
        closeLabel={openId === 'ai-rescue' ? 'Close' : openId === 'people-motion' ? 'Close Case Study' : undefined}
        closeAccent={openId === 'ai-rescue' ? 'red' : undefined}
        joystickBadgeSrc={openId === 'galgalatz' ? asset('/assets/galgalatz/joystick-galgaltz.png') : undefined}
        layoutId={openId ? `card-${openId}` : undefined}
        breakout={
          openId === 'ai-rescue' ? (
            <AiRescueBreakout />
          ) : openId === 'amy' ? (
            <AmyCaseStudyBreakout />
          ) : openId === 'people-motion' ? (
            <PeopleMotionBreakout />
          ) : openId === 'galgalatz' ? (
            <GalgalatzBreakout />
          ) : undefined
        }
      >
        {openId === 'amy' && <AmyCaseStudy onClose={close} />}
        {openId === 'galgalatz' && <GalgalatzCaseStudy onClose={close} />}
        {openId === 'ai-rescue' && <AiRescueCaseStudy onClose={close} />}
        {openId === 'people-motion' && <PeopleMotionCaseStudy onClose={close} />}
      </ProjectModal>
    </LayoutGroup>
  )
}
