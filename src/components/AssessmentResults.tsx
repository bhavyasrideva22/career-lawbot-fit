import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AssessmentResults as Results } from "@/types/assessment";
import { 
  Brain, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Download,
  RotateCcw,
  ArrowRight
} from "lucide-react";

interface AssessmentResultsProps {
  results: Results;
  onRestart: () => void;
}

const AssessmentResults = ({ results, onRestart }: AssessmentResultsProps) => {
  const getRecommendationConfig = () => {
    switch (results.recommendation) {
      case 'pursue':
        return {
          icon: CheckCircle,
          title: "Recommended: Pursue This Career",
          description: "You show strong compatibility for legal chatbot development",
          color: "text-success",
          bgColor: "bg-success/10",
          borderColor: "border-success/20"
        };
      case 'maybe':
        return {
          icon: AlertCircle,
          title: "Maybe: Develop Skills First",
          description: "You have potential but need targeted skill development",
          color: "text-warning",
          bgColor: "bg-warning/10",
          borderColor: "border-warning/20"
        };
      case 'no':
        return {
          icon: XCircle,
          title: "Not Recommended Currently",
          description: "Consider alternative paths or foundational development",
          color: "text-destructive",
          bgColor: "bg-destructive/10",
          borderColor: "border-destructive/20"
        };
    }
  };

  const recommendationConfig = getRecommendationConfig();
  const RecommendationIcon = recommendationConfig.icon;

  const wiscarLabels = {
    will: "Will & Persistence",
    interest: "Interest & Passion", 
    skill: "Current Skills",
    cognitiveReadiness: "Cognitive Readiness",
    abilityToLearn: "Learning Ability",
    realWorldAlignment: "Career Alignment"
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Your Assessment Results
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on your responses, here's your personalized career fit analysis and recommendations
          </p>
        </div>

        {/* Overall Score & Recommendation */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gradient-card shadow-large border-border/50">
            <CardHeader className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Brain className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-2xl">Overall Compatibility</CardTitle>
              <div className="text-4xl font-bold text-primary mt-2">
                {results.overallScore}%
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={results.overallScore} className="h-3 mb-4" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Psychometric:</span>
                  <div className="font-semibold">{results.psychometricScore}%</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Technical:</span>
                  <div className="font-semibold">{results.technicalScore}%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`shadow-large ${recommendationConfig.bgColor} ${recommendationConfig.borderColor} border-2`}>
            <CardHeader className="text-center">
              <div className={`w-20 h-20 mx-auto mb-4 bg-background rounded-full flex items-center justify-center`}>
                <RecommendationIcon className={`w-10 h-10 ${recommendationConfig.color}`} />
              </div>
              <CardTitle className={`text-xl ${recommendationConfig.color}`}>
                {recommendationConfig.title}
              </CardTitle>
              <CardDescription className="text-base mt-2">
                {recommendationConfig.description}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* WISCAR Framework Results */}
        <Card className="mb-12 bg-background shadow-large border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-accent" />
              WISCAR Framework Analysis
            </CardTitle>
            <CardDescription>
              Comprehensive evaluation across six key dimensions for career success
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(results.wiscarScores).map(([key, score]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {wiscarLabels[key as keyof typeof wiscarLabels]}
                    </span>
                    <span className="text-sm font-bold">{score}%</span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insights & Next Steps */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-background shadow-large border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.insights.map((insight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <p className="text-sm leading-relaxed">{insight}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-background shadow-large border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Recommended Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.nextSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent/10 text-accent rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-relaxed">{step}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Career Paths */}
        <Card className="mb-12 bg-background shadow-large border-border/50">
          <CardHeader>
            <CardTitle>Recommended Career Paths</CardTitle>
            <CardDescription>
              Career opportunities ranked by your compatibility score
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.careerPaths
                .sort((a, b) => b.match - a.match)
                .map((path, index) => (
                <Card key={index} className="border-border/50 hover:shadow-medium transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{path.title}</CardTitle>
                      <Badge variant={path.match >= 75 ? "default" : path.match >= 50 ? "secondary" : "outline"}>
                        {path.match}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {path.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skill Gaps */}
        <Card className="mb-12 bg-background shadow-large border-border/50">
          <CardHeader>
            <CardTitle>Skill Development Plan</CardTitle>
            <CardDescription>
              Areas for improvement to reach your career goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {results.skillGaps.map((gap, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{gap.skill}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant={gap.priority === 'high' ? 'destructive' : gap.priority === 'medium' ? 'secondary' : 'outline'}>
                        {gap.priority} priority
                      </Badge>
                      <span className="text-sm">{gap.current}% → {gap.target}%</span>
                    </div>
                  </div>
                  <div className="relative">
                    <Progress value={gap.current} className="h-2" />
                    <div 
                      className="absolute top-0 h-2 bg-accent/30 rounded-full"
                      style={{ width: `${gap.target}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="outline" onClick={onRestart} className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Retake Assessment
          </Button>
          
          <Button variant="default" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Report
          </Button>

          <Button variant="hero" className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4" />
            Start Learning Path
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;