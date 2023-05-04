'use client';


import EmptyState from "@/app/components/EmptyState";
import { useEffect } from "react";

interface ErrorStateProps {
  error: Error
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return ( 
    <EmptyState
      title="Ooops"
      subtitle="Algo deu errado :( !"
    />
   );
}
 
export default ErrorState;