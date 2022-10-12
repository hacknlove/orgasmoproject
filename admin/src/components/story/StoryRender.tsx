import AreasContext from "@orgasmo/orgasmo/AreasContext";
import { useRouter } from "next/router";
import { useContext, Component, ErrorInfo, ReactNode } from "react";
import * as equal from "fast-deep-equal";

export default function StoryRender({ itemConfig }) {
  const router = useRouter();
  const { DComponent } = useContext(AreasContext);

  return (
    <ErrorBoundary>
      <DComponent type={router.query.component} props={itemConfig.props} />
    </ErrorBoundary>
  );
}

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: any;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: error };
  }

  componentDidUpdate(prevProps) {
    if (!equal(this.props, prevProps)) {
      this.setState({ hasError: false });
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <h1>The Component properties are not valid</h1>;
    }

    return this.props.children;
  }
}
