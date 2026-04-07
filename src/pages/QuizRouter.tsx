import { useQuiz, NO_NAV_SCREENS, SCREENS } from '../state/QuizContext';
import { ScreenTransition } from '../components/animations';
import { HookScreen } from '../components/sections/HookScreen';
import { InterStartScreen, InterIdScreen, InterRootScreen, AuthSciScreen } from '../components/sections/InterstitialScreens';
import { LoadMidScreen, LoadFinalScreen } from '../components/sections/LoadingScreens';
import { SocialMidScreen, OutcomeScreen, AuthDrScreen } from '../components/sections/ContentScreens';
import { EmailScreen, Report1Screen, Report2Screen, ReportBAScreen } from '../components/report/ReportScreens';
import { PricingScreen } from '../components/offer/PricingScreen';
import { SingleQScreen, BodySingleQScreen, MultiQScreen, ArchGridScreen } from '../components/quiz/QuestionScreens';
import {
  SYMPTOM_QUESTION, TRIED_QUESTION, STRESS_FREQ_QUESTION, IDENTITY_QUESTION,
  ASSESS_QUESTION, MISMATCH_QUESTION, S1_QUESTION, S2_QUESTION, S3_QUESTION,
  S4_QUESTION, ROOT_QUESTION, ZONE_QUESTION, SLEEP_QUESTION, BREATH_QUESTION,
  CARE_QUESTION, COMMIT_QUESTION, ARCH_OPTIONS,
} from '../data/questions';

export function QuizRouter() {
  const { currentScreen, state } = useQuiz();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'hook':         return <HookScreen />;
      case 'q_gender':     return (
        <SingleQScreen
          data={{
            id: 'q_gender', question: 'Which best describes you?',
            subtext: 'This helps us understand your body\'s specific symptom patterns — they differ significantly by body type.',
            type: 'single', storeKey: 'q_gender',
            options: [
              { value: 'female', label: '🌸 Woman' },
              { value: 'male',   label: '🌿 Man' },
              { value: 'other',  label: '✨ Non-binary / Prefer not to say' },
            ],
          }}
          badge="Question 1 of 20"
        />
      );
      case 'inter_start':  return <InterStartScreen />;
      case 'q_goal':       return <MultiQScreen data={SYMPTOM_QUESTION} badge="Question 2 of 20" />;
      case 'q_tried':      return <MultiQScreen data={TRIED_QUESTION}   badge="Question 3 of 20" />;
      case 'q_stress_freq':return <SingleQScreen data={STRESS_FREQ_QUESTION} badge="Question 4 of 20" />;
      case 'auth_sci':     return <AuthSciScreen />;
      case 'q_identity':   return <SingleQScreen data={IDENTITY_QUESTION} badge="Question 5 of 20" />;
      case 'inter_id':     return <InterIdScreen />;
      case 'q_assess':     return <SingleQScreen data={ASSESS_QUESTION}  badge="Question 6 of 20" />;
      case 'q_mismatch':   return (
        <SingleQScreen
          data={MISMATCH_QUESTION}
          badge="Question 7 of 20"
          quote="People think I'm doing fine. But my body is constantly giving me signals - tension, fatigue, poor sleep - and I've just been trying to push through it."
        />
      );
      case 'q_s1':         return <BodySingleQScreen data={S1_QUESTION}   badge="Question 8 of 20"  activeZone="head" />;
      case 'q_s2':         return <BodySingleQScreen data={S2_QUESTION}   badge="Question 9 of 20"  activeZone="gut" />;
      case 'load_mid':     return <LoadMidScreen />;
      case 'q_s3':         return <BodySingleQScreen data={S3_QUESTION}   badge="Question 10 of 20" activeZone="gut" />;
      case 'q_s4':         return <BodySingleQScreen data={S4_QUESTION}   badge="Question 11 of 20" activeZone="upper" />;
      case 'q_root':       return <SingleQScreen data={ROOT_QUESTION}   badge="Question 12 of 20" />;
      case 'inter_root':   return <InterRootScreen />;
      case 'q_zone':       return <BodySingleQScreen data={ZONE_QUESTION} badge="Question 13 of 20" />;
      case 'q_sleep':      return <BodySingleQScreen data={SLEEP_QUESTION} badge="Question 14 of 20" activeZone="head" />;
      case 'q_breath':     return <SingleQScreen data={BREATH_QUESTION}  badge="Question 15 of 20" />;
      case 'q_care':       return <SingleQScreen data={CARE_QUESTION}    badge="Question 16 of 20" />;
      case 'social_mid':   return <SocialMidScreen />;
      case 'q_arch':       return <ArchGridScreen options={ARCH_OPTIONS} />;
      case 'q_commit':     return <SingleQScreen data={COMMIT_QUESTION}  badge="Question 18 of 20" />;
      case 'outcome':      return <OutcomeScreen />;
      case 'auth_dr':      return <AuthDrScreen />;
      case 'load_final':   return <LoadFinalScreen />;
      case 'email':        return <EmailScreen />;
      case 'rep1':         return <Report1Screen />;
      case 'rep2':         return <Report2Screen />;
      case 'rep_ba':       return <ReportBAScreen />;
      case 'pricing':      return <PricingScreen />;
      default:             return <HookScreen />;
    }
  };

  return (
    <ScreenTransition
      screenKey={currentScreen}
      direction={state.direction}
    >
      {renderScreen()}
    </ScreenTransition>
  );
}
