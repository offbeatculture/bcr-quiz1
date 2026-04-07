import { QuizProvider } from './state/QuizContext';
import { QuizRouter } from './pages/QuizRouter';

export default function App() {
  return (
    <QuizProvider>
      <div className="min-h-screen bg-teal-900 flex items-center justify-center p-0 sm:p-4">
        <div className="w-full max-w-[500px] min-h-screen sm:min-h-0 sm:rounded-[24px] overflow-hidden shadow-2xl bg-cream-50">
          <QuizRouter />
        </div>
      </div>
    </QuizProvider>
  );
}
