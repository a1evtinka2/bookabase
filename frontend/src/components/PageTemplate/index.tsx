import { useTheme } from "../../providers/ThemeProvider";
import { DarkModeToggle } from "../DarkModeToggle";

type PageTemplateProps = {
  children: React.ReactNode;
};

function PageTemplate({ children }: PageTemplateProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  return (
    <div className={`${!isLight && 'reading-room'} relative min-h-screen w-full bg-background text-foreground overflow-y-hidden`}>
      <div className="fixed bottom-4 right-4 z-50">
        <DarkModeToggle />
      </div>
      {theme === 'light' && <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        {/* Top-left glow */}
        <div
          className="
        absolute
        -left-32
        -top-44
        h-[36rem]
        w-[36rem]
        rounded-full
        bg-glow-cool
        opacity-50
        blur-[110px]
      "
        />

        {/* Bottom-right glow */}
        <div
          className="
        absolute
        -bottom-48
        -right-24
        h-[32rem]
        w-[32rem]
        rounded-full
        bg-glow-warm
        opacity-40
        blur-[120px]
      "
        />
      </div>}
      {children}
    </div>
  );
}

export default PageTemplate;
