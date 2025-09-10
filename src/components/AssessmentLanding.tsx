import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Scale, Code, Zap, Users, TrendingUp, Clock, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-assessment.jpg";

interface AssessmentLandingProps {
  onStartAssessment: () => void;
}

const AssessmentLanding = ({ onStartAssessment }: AssessmentLandingProps) => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Legal AI Assessment" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto animate-slide-up">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered Career Assessment
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Legal Chatbot Developer Career Fit & Readiness Assessment
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover if developing AI-powered chatbots for legal services aligns with your skills, personality, and career goals
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                variant="hero" 
                size="xl" 
                onClick={onStartAssessment}
                className="animate-pulse-glow"
              >
                <Brain className="w-6 h-6 mr-2" />
                Start Assessment Now
              </Button>
              <div className="flex items-center text-primary-foreground/80">
                <Clock className="w-5 h-5 mr-2" />
                <span>20-30 minutes • Instant Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Role Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              About Legal Chatbot Development
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Build AI-powered chatbots that revolutionize legal services by automating client interactions, 
              document analysis, and providing basic legal guidance through intelligent conversation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gradient-card border-border/50 hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <Code className="w-12 h-12 text-primary mb-4" />
                <CardTitle>What You'll Build</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Intelligent chatbots using NLP, Python, and frameworks like Rasa or Dialogflow, 
                  integrated with legal databases and knowledge systems.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50 hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <Users className="w-12 h-12 text-accent mb-4" />
                <CardTitle>Career Paths</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Legal technologist, AI solutions architect, NLP engineer, 
                  legal data analyst, or AI consultant in the legal industry.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50 hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-success mb-4" />
                <CardTitle>Success Traits</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Problem-solving mindset, attention to detail, curiosity about law & AI, 
                  strong communication, and logical thinking abilities.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Assessment Overview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              Comprehensive Assessment Framework
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-background border-border hover:shadow-medium transition-all duration-300">
                <CardHeader>
                  <Brain className="w-12 h-12 text-primary mb-4" />
                  <CardTitle className="text-xl">Psychometric Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-success mr-3" />
                    <span>Personality compatibility assessment</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-success mr-3" />
                    <span>Interest and motivation evaluation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-success mr-3" />
                    <span>Cognitive style and work preferences</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background border-border hover:shadow-medium transition-all duration-300">
                <CardHeader>
                  <Scale className="w-12 h-12 text-accent mb-4" />
                  <CardTitle className="text-xl">Technical & Aptitude</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-success mr-3" />
                    <span>Programming and logical reasoning</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-success mr-3" />
                    <span>Legal domain knowledge</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-success mr-3" />
                    <span>NLP and chatbot fundamentals</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <p className="text-lg text-muted-foreground mb-8">
                Get personalized insights using our WISCAR framework to evaluate your Will, Interest, 
                Skill, Cognitive readiness, Ability to learn, and Real-world alignment.
              </p>
              
              <Button 
                variant="accent" 
                size="xl" 
                onClick={onStartAssessment}
                className="animate-float"
              >
                <Brain className="w-6 h-6 mr-2" />
                Begin Your Journey
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssessmentLanding;