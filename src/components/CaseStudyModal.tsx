import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export interface CaseStudy {
  title: string;
  summary: string;
  problem: string;
  solution: string;
  process: string;
  stack: string[];
  github: string;
}

interface Props {
  study: CaseStudy | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CaseStudyModal = ({ study, open, onOpenChange }: Props) => {
  if (!study) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-heading-sm">{study.title}</DialogTitle>
          <DialogDescription>{study.summary}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          <div>
            <h4 className="text-body font-semibold text-foreground mb-1">
              Problem
            </h4>
            <p className="text-body-sm text-muted-foreground">
              {study.problem}
            </p>
          </div>
          <div>
            <h4 className="text-body font-semibold text-foreground mb-1">
              Solution
            </h4>
            <p className="text-body-sm text-muted-foreground">
              {study.solution}
            </p>
          </div>
          <div>
            <h4 className="text-body font-semibold text-foreground mb-1">
              Process
            </h4>
            <p className="text-body-sm text-muted-foreground">
              {study.process}
            </p>
          </div>
          <div>
            <h4 className="text-body font-semibold text-foreground mb-1">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {study.stack.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
          <Button variant="outline" className="gap-2" asChild>
            <a href={study.github} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              View on GitHub
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseStudyModal;
