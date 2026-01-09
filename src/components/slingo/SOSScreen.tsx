"use client";

import { useState } from "react";
import { Search, Heart, Clock, Sparkles, ChefHat, Flame, Timer, Coffee, Cookie, IceCream, Apple, Banana, Cherry, Grape, Circle, Milk, Candy, Cake, Croissant, Soup, Droplet, Snowflake, Zap, ArrowLeft, X } from "lucide-react";

interface Recipe {
  id: number;
  name: string;
  calories: number;
  time: string;
  category: string;
  icon: string;
  tags: string[];
  ingredients?: string[];
  steps?: string[];
  fitTip?: string;
}

export default function SOSScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [usedFitTip, setUsedFitTip] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [displayedCalories, setDisplayedCalories] = useState<number | null>(null);
  const [quickFilterActive, setQuickFilterActive] = useState<string | null>(null);
  const [displayedRecipesCount, setDisplayedRecipesCount] = useState(6);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const recipes: Recipe[] = [
    // 🍫 Bem doce + ⚡ Bem rápido (Chocolate até 3min)
    { 
      id: 1, 
      name: "Brigadeiro de Colher", 
      calories: 180, 
      time: "2 min", 
      category: "chocolate", 
      icon: "Cookie", 
      tags: ["chocolate", "rapido"],
      ingredients: [
        "3 colheres de leite condensado",
        "1 colher de chocolate em pó",
        "1 colher de manteiga"
      ],
      steps: [
        "Coloque todos os ingredientes em uma caneca.",
        "Misture bem até ficar homogêneo.",
        "Leve ao micro-ondas por 1 minuto.",
        "Mexa e leve por mais 30 segundos."
      ],
      fitTip: "Use metade do leite condensado e complete com iogurte grego para reduzir calorias."
    },
    { 
      id: 2, 
      name: "Mousse de Chocolate Express", 
      calories: 220, 
      time: "3 min", 
      category: "chocolate", 
      icon: "Cake", 
      tags: ["chocolate", "rapido"],
      ingredients: [
        "1 caixinha de creme de leite",
        "3 colheres de chocolate em pó",
        "2 colheres de açúcar"
      ],
      steps: [
        "Bata todos os ingredientes no liquidificador por 2 minutos.",
        "Despeje em um pote.",
        "Leve à geladeira por 1 hora ou sirva imediatamente."
      ],
      fitTip: "Troque o açúcar por adoçante culinário e use creme de leite light."
    },
    { 
      id: 3, 
      name: "Creme de Chocolate no Pote", 
      calories: 195, 
      time: "2 min", 
      category: "chocolate", 
      icon: "Coffee", 
      tags: ["chocolate", "rapido"],
      ingredients: [
        "2 colheres de achocolatado",
        "1 copo de leite",
        "1 colher de amido de milho"
      ],
      steps: [
        "Misture tudo em uma caneca.",
        "Leve ao micro-ondas por 1 minuto.",
        "Mexa bem e leve por mais 30 segundos.",
        "Deixe esfriar um pouco antes de comer."
      ],
      fitTip: "Use leite desnatado e achocolatado diet para gastar menos calorias."
    },
    { 
      id: 4, 
      name: "Brigadeiro de Micro-ondas", 
      calories: 170, 
      time: "3 min", 
      category: "chocolate", 
      icon: "Zap", 
      tags: ["chocolate", "rapido"],
      ingredients: [
        "4 colheres de leite condensado",
        "2 colheres de chocolate em pó",
        "1 colher de manteiga"
      ],
      steps: [
        "Misture tudo em uma tigela.",
        "Leve ao micro-ondas por 1 minuto.",
        "Mexa e volte por mais 1 minuto.",
        "Deixe esfriar antes de enrolar."
      ],
      fitTip: "Reduza o leite condensado pela metade e adicione banana amassada."
    },
    { 
      id: 5, 
      name: "Chocolate Quente Cremoso", 
      calories: 210, 
      time: "3 min", 
      category: "chocolate", 
      icon: "Coffee", 
      tags: ["chocolate", "rapido"],
      ingredients: [
        "1 copo de leite",
        "2 colheres de chocolate em pó",
        "1 colher de açúcar",
        "1 colher de amido de milho"
      ],
      steps: [
        "Misture tudo em uma caneca.",
        "Leve ao micro-ondas por 2 minutos.",
        "Mexa bem e sirva quente."
      ],
      fitTip: "Use leite desnatado e adoçante para reduzir calorias sem perder cremosidade."
    },
    { 
      id: 6, 
      name: "Trufa Rápida", 
      calories: 160, 
      time: "2 min", 
      category: "chocolate", 
      icon: "Candy", 
      tags: ["chocolate", "rapido"],
      ingredients: [
        "3 colheres de leite condensado",
        "2 colheres de chocolate em pó",
        "1 colher de manteiga",
        "Chocolate granulado para cobrir"
      ],
      steps: [
        "Misture leite condensado, chocolate e manteiga.",
        "Leve ao micro-ondas por 1 minuto.",
        "Deixe esfriar e faça bolinhas.",
        "Passe no granulado."
      ],
      fitTip: "Passe no cacau em pó em vez de granulado para economizar calorias."
    },
    { 
      id: 7, 
      name: "Creme de Cacau Instantâneo", 
      calories: 185, 
      time: "2 min", 
      category: "chocolate", 
      icon: "Coffee", 
      tags: ["chocolate", "rapido"],
      ingredients: [
        "1 copo de leite",
        "3 colheres de cacau em pó",
        "2 colheres de açúcar",
        "1 colher de amido de milho"
      ],
      steps: [
        "Misture tudo em uma caneca.",
        "Leve ao micro-ondas por 1 minuto e 30 segundos.",
        "Mexa bem e sirva."
      ],
      fitTip: "Troque o açúcar por adoçante e use leite desnatado."
    },
    { 
      id: 8, 
      name: "Pudim de Chocolate Rápido", 
      calories: 200, 
      time: "3 min", 
      category: "chocolate", 
      icon: "Cake", 
      tags: ["chocolate", "rapido"],
      ingredients: [
        "1 copo de leite",
        "3 colheres de chocolate em pó",
        "2 colheres de açúcar",
        "2 colheres de amido de milho"
      ],
      steps: [
        "Bata tudo no liquidificador.",
        "Despeje em uma forma.",
        "Leve ao micro-ondas por 2 minutos.",
        "Deixe esfriar antes de desenformar."
      ],
      fitTip: "Use leite desnatado e reduza o açúcar pela metade."
    },
    
    // 🍫 Bem doce (Chocolate 4-5min)
    { 
      id: 9, 
      name: "Bolo de Caneca de Chocolate", 
      calories: 250, 
      time: "4 min", 
      category: "chocolate", 
      icon: "Cake", 
      tags: ["chocolate"],
      ingredients: [
        "4 colheres de farinha de trigo",
        "3 colheres de açúcar",
        "2 colheres de chocolate em pó",
        "1 ovo",
        "3 colheres de leite",
        "2 colheres de óleo"
      ],
      steps: [
        "Misture tudo em uma caneca grande.",
        "Mexa até ficar homogêneo.",
        "Leve ao micro-ondas por 3 minutos.",
        "Deixe esfriar um pouco antes de comer."
      ],
      fitTip: "Troque o óleo por iogurte natural e use farinha integral."
    },
    { 
      id: 10, 
      name: "Brownie de Caneca", 
      calories: 280, 
      time: "5 min", 
      category: "chocolate", 
      icon: "Cookie", 
      tags: ["chocolate"],
      ingredients: [
        "3 colheres de farinha de trigo",
        "3 colheres de açúcar",
        "2 colheres de chocolate em pó",
        "1 ovo",
        "2 colheres de óleo",
        "1 colher de gotas de chocolate"
      ],
      steps: [
        "Misture farinha, açúcar e chocolate na caneca.",
        "Adicione ovo e óleo, misture bem.",
        "Coloque as gotas de chocolate por cima.",
        "Leve ao micro-ondas por 2 minutos."
      ],
      fitTip: "Use metade do açúcar e adicione banana amassada para adoçar naturalmente."
    },
    { 
      id: 11, 
      name: "Pavê de Chocolate Rápido", 
      calories: 240, 
      time: "5 min", 
      category: "chocolate", 
      icon: "Cake", 
      tags: ["chocolate"],
      ingredients: [
        "1 pacote de biscoito maisena",
        "1 copo de leite",
        "1 caixinha de creme de leite",
        "3 colheres de chocolate em pó",
        "2 colheres de açúcar"
      ],
      steps: [
        "Molhe os biscoitos no leite e faça uma camada no pote.",
        "Misture creme de leite, chocolate e açúcar.",
        "Cubra os biscoitos com o creme.",
        "Repita as camadas e leve à geladeira."
      ],
      fitTip: "Use biscoito integral e creme de leite light para reduzir calorias."
    },
    { 
      id: 12, 
      name: "Brigadeiro Gourmet", 
      calories: 190, 
      time: "4 min", 
      category: "chocolate", 
      icon: "Candy", 
      tags: ["chocolate"],
      ingredients: [
        "1 lata de leite condensado",
        "3 colheres de chocolate em pó",
        "1 colher de manteiga",
        "Chocolate granulado"
      ],
      steps: [
        "Misture leite condensado, chocolate e manteiga em uma panela.",
        "Leve ao micro-ondas por 2 minutos.",
        "Mexa e volte por mais 1 minuto.",
        "Deixe esfriar, enrole e passe no granulado."
      ],
      fitTip: "Passe no cacau em pó puro em vez de granulado."
    },
    { 
      id: 13, 
      name: "Mousse de Chocolate com Creme", 
      calories: 235, 
      time: "5 min", 
      category: "chocolate", 
      icon: "Cake", 
      tags: ["chocolate"],
      ingredients: [
        "1 caixinha de creme de leite",
        "200g de chocolate meio amargo",
        "2 colheres de açúcar"
      ],
      steps: [
        "Derreta o chocolate no micro-ondas por 1 minuto.",
        "Misture com o creme de leite e açúcar.",
        "Bata bem até ficar cremoso.",
        "Leve à geladeira por 30 minutos."
      ],
      fitTip: "Use chocolate 70% cacau e reduza o açúcar pela metade."
    },
    { 
      id: 14, 
      name: "Chocolate Cremoso no Copo", 
      calories: 215, 
      time: "4 min", 
      category: "chocolate", 
      icon: "Coffee", 
      tags: ["chocolate"],
      ingredients: [
        "1 copo de leite",
        "3 colheres de achocolatado",
        "1 colher de amido de milho",
        "Chantilly para decorar"
      ],
      steps: [
        "Misture leite, achocolatado e amido na caneca.",
        "Leve ao micro-ondas por 2 minutos.",
        "Mexa bem e volte por mais 1 minuto.",
        "Decore com chantilly."
      ],
      fitTip: "Use leite desnatado e pule o chantilly para economizar calorias."
    },
    { 
      id: 15, 
      name: "Ganache Rápida", 
      calories: 225, 
      time: "4 min", 
      category: "chocolate", 
      icon: "Droplet", 
      tags: ["chocolate"],
      ingredients: [
        "1 caixinha de creme de leite",
        "200g de chocolate meio amargo"
      ],
      steps: [
        "Derreta o chocolate no micro-ondas por 1 minuto.",
        "Adicione o creme de leite e misture.",
        "Leve ao micro-ondas por mais 30 segundos.",
        "Mexa até ficar brilhante."
      ],
      fitTip: "Use chocolate 70% cacau para menos açúcar e mais sabor."
    },
    
    // 🍫 NOVAS 15 RECEITAS DE CHOCOLATE
    { 
      id: 61, 
      name: "Palha Italiana Express", 
      calories: 265, 
      time: "4 min", 
      category: "chocolate", 
      icon: "Cookie", 
      tags: ["chocolate"],
      ingredients: [
        "200g de chocolate meio amargo",
        "1 lata de leite condensado",
        "1 pacote de biscoito maisena triturado",
        "2 colheres de manteiga"
      ],
      steps: [
        "Derreta o chocolate com a manteiga no micro-ondas.",
        "Misture o leite condensado.",
        "Adicione o biscoito triturado e mexa bem.",
        "Despeje em uma forma e leve à geladeira."
      ],
      fitTip: "Use chocolate 70% cacau e reduza o leite condensado pela metade."
    },
    { 
      id: 62, 
      name: "Brigadeiro de Nutella", 
      calories: 245, 
      time: "3 min", 
      category: "chocolate", 
      icon: "Candy", 
      tags: ["chocolate", "rapido"],
      ingredients: [
        "3 colheres de leite condensado",
        "2 colheres de Nutella",
        "1 colher de manteiga"
      ],
      steps: [
        "Misture tudo em uma caneca.",
        "Leve ao micro-ondas por 1 minuto.",
        "Mexa e volte por mais 30 segundos.",
        "Deixe esfriar antes de enrolar."
      ],
      fitTip: "Reduza a Nutella pela metade e adicione cacau em pó."
    },
    { 
      id: 63, 
      name: "Mousse de Chocolate Branco", 
      calories: 230, 
      time: "4 min", 
      category: "chocolate", 
      icon: "Cake", 
      tags: ["chocolate"],
      ingredients: [
        "200g de chocolate branco",
        "1 caixinha de creme de leite",
        "1 colher de essência de baunilha"
      ],
      steps: [
        "Derreta o chocolate branco no micro-ondas.",
        "Misture com creme de leite e baunilha.",
        "Bata até ficar cremoso.",
        "Leve à geladeira por 30 minutos."
      ],
      fitTip: "Use chocolate branco diet e creme de leite light."
    },
    { 
      id: 64, 
      name: "Bolo de Chocolate com Recheio", 
      calories: 290, 
      time: "5 min", 
      category: "chocolate", 
      icon: "Cake", 
      tags: ["chocolate"],
      ingredients: [
        "4 colheres de farinha de trigo",
        "3 colheres de açúcar",
        "2 colheres de chocolate em pó",
        "1 ovo",
        "3 colheres de leite",
        "2 colheres de óleo",
        "1 colher de Nutella para recheio"
      ],
      steps: [
        "Misture todos os ingredientes exceto a Nutella.",
        "Despeje metade da massa na caneca.",
        "Adicione a Nutella no centro.",
        "Cubra com o resto da massa e leve ao micro-ondas por 3 minutos."
      ],
      fitTip: "Use farinha integral e reduza o açúcar pela metade."
    },
    { 
      id: 65, 
      name: "Trufa de Chocolate Amargo", 
      calories: 175, 
      time: "4 min", 
      category: "chocolate", 
      icon: "Candy", 
      tags: ["chocolate"],
      ingredients: [
        "200g de chocolate 70% cacau",
        "3 colheres de creme de leite",
        "Cacau em pó para cobrir"
      ],
      steps: [
        "Derreta o chocolate no micro-ondas.",
        "Misture com o creme de leite.",
        "Deixe esfriar e faça bolinhas.",
        "Passe no cacau em pó."
      ],
      fitTip: "Chocolate amargo já tem menos açúcar, perfeito para dieta."
    },
    { 
      id: 66, 
      name: "Pudim de Chocolate Cremoso", 
      calories: 255, 
      time: "5 min", 
      category: "chocolate", 
      icon: "Cake", 
      tags: ["chocolate"],
      ingredients: [
        "1 lata de leite condensado",
        "2 copos de leite",
        "3 colheres de chocolate em pó",
        "3 ovos"
      ],
      steps: [
        "Bata tudo no liquidificador.",
        "Despeje em uma forma caramelizada.",
        "Leve ao micro-ondas por 5 minutos.",
        "Deixe esfriar antes de desenformar."
      ],
      fitTip: "Use leite condensado light e chocolate em pó 70% cacau."
    },
    { 
      id: 67, 
      name: "Chocolate Quente Especial", 
      calories: 240, 
      time: "3 min", 
      category: "chocolate", 
      icon: "Coffee", 
      tags: ["chocolate", "rapido"],
      ingredients: [
        "1 copo de leite",
        "3 colheres de chocolate em pó",
        "1 colher de açúcar",
        "1 colher de amido de milho",
        "Marshmallows para decorar"
      ],
      steps: [
        "Misture leite, chocolate, açúcar e amido.",
        "Leve ao micro-ondas por 2 minutos.",
        "Mexa bem e decore com marshmallows.",
        "Sirva quente."
      ],
      fitTip: "Use leite desnatado e pule os marshmallows."
    },
    { 
      id: 68, 
      name: "Brigadeiro de Café", 
      calories: 195, 
      time: "3 min", 
      category: "chocolate", 
      icon: "Coffee", 
      tags: ["chocolate", "rapido"],
      ingredients: [
        "3 colheres de leite condensado",
        "2 colheres de chocolate em pó",
        "1 colher de café solúvel",
        "1 colher de manteiga"
      ],
      steps: [
        "Misture tudo em uma caneca.",
        "Leve ao micro-ondas por 1 minuto.",
        "Mexa e volte por mais 30 segundos.",
        "Deixe esfriar."
      ],
      fitTip: "Use leite condensado light e café sem açúcar."
    },
    { 
      id: 69, 
      name: "Mousse de Chocolate com Abacate", 
      calories: 210, 
      time: "4 min", 
      category: "chocolate", 
      icon: "Cake", 
      tags: ["chocolate"],
      ingredients: [
        "1 abacate maduro",
        "3 colheres de cacau em pó",
        "3 colheres de mel",
        "1 colher de essência de baunilha"
      ],
      steps: [
        "Bata tudo no liquidificador até ficar cremoso.",
        "Despeje em potes.",
        "Leve à geladeira por 30 minutos.",
        "Sirva gelado."
      ],
      fitTip: "Abacate já torna a receita mais saudável e cremosa naturalmente."
    },
    { 
      id: 70, 
      name: "Brownie de Chocolate Fit", 
      calories: 220, 
      time: "4 min", 
      category: "chocolate", 
      icon: "Cookie", 
      tags: ["chocolate"],
      ingredients: [
        "3 colheres de farinha de aveia",
        "2 colheres de cacau em pó",
        "1 ovo",
        "2 colheres de mel",
        "1 colher de óleo de coco"
      ],
      steps: [
        "Misture tudo em uma caneca.",
        "Mexa até ficar homogêneo.",
        "Leve ao micro-ondas por 2 minutos.",
        "Deixe esfriar antes de comer."
      ],
      fitTip: "Receita já é fit! Aveia e cacau puro são super saudáveis."
    },
    { 
      id: 71, 
      name: "Brigadeiro de Chocolate Branco", 
      calories: 200, 
      time: "3 min", 
      category: "chocolate", 
      icon: "Candy", 
      tags: ["chocolate", "rapido"],
      ingredients: [
        "3 colheres de leite condensado",
        "2 colheres de chocolate branco picado",
        "1 colher de manteiga"
      ],
      steps: [
        "Misture tudo em uma caneca.",
        "Leve ao micro-ondas por 1 minuto.",
        "Mexa e volte por mais 30 segundos.",
        "Deixe esfriar antes de enrolar."
      ],
      fitTip: "Use chocolate branco diet e leite condensado light."
    },
    { 
      id: 72, 
      name: "Creme de Chocolate com Banana", 
      calories: 185, 
      time: "3 min", 
      category: "chocolate", 
      icon: "Coffee", 
      tags: ["chocolate", "rapido"],
      ingredients: [
        "1 banana madura",
        "2 colheres de cacau em pó",
        "1 copo de leite",
        "1 colher de mel"
      ],
      steps: [
        "Bata tudo no liquidificador.",
        "Despeje em uma caneca.",
        "Leve ao micro-ondas por 1 minuto.",
        "Sirva quente ou frio."
      ],
      fitTip: "Banana já adoça naturalmente, pode pular o mel."
    },
    { 
      id: 73, 
      name: "Trufa de Chocolate com Coco", 
      calories: 190, 
      time: "4 min", 
      category: "chocolate", 
      icon: "Candy", 
      tags: ["chocolate"],
      ingredients: [
        "3 colheres de leite condensado",
        "2 colheres de chocolate em pó",
        "1 colher de manteiga",
        "Coco ralado para cobrir"
      ],
      steps: [
        "Misture leite condensado, chocolate e manteiga.",
        "Leve ao micro-ondas por 1 minuto.",
        "Deixe esfriar e faça bolinhas.",
        "Passe no coco ralado."
      ],
      fitTip: "Use coco ralado sem açúcar para reduzir calorias."
    },
    { 
      id: 74, 
      name: "Pavê de Chocolate com Morango", 
      calories: 260, 
      time: "5 min", 
      category: "chocolate", 
      icon: "Cake", 
      tags: ["chocolate"],
      ingredients: [
        "1 pacote de biscoito maisena",
        "1 copo de leite",
        "1 caixinha de creme de leite",
        "3 colheres de chocolate em pó",
        "5 morangos picados"
      ],
      steps: [
        "Molhe os biscoitos no leite.",
        "Misture creme de leite com chocolate.",
        "Faça camadas de biscoito, creme e morango.",
        "Leve à geladeira por 1 hora."
      ],
      fitTip: "Use biscoito integral e creme de leite light."
    },
    { 
      id: 75, 
      name: "Chocolate com Pasta de Amendoim", 
      calories: 270, 
      time: "2 min", 
      category: "chocolate", 
      icon: "Cookie", 
      tags: ["chocolate", "rapido"],
      ingredients: [
        "2 colheres de pasta de amendoim",
        "2 colheres de chocolate em pó",
        "1 colher de mel",
        "1 colher de leite"
      ],
      steps: [
        "Misture tudo em uma tigela.",
        "Leve ao micro-ondas por 30 segundos.",
        "Mexa bem até ficar cremoso.",
        "Sirva imediatamente."
      ],
      fitTip: "Use pasta de amendoim natural sem açúcar adicionado."
    },
    
    // ⚡ NOVAS 15 RECEITAS BEM RÁPIDO (até 2 min)
    { 
      id: 76, 
      name: "Iogurte com Mel e Canela", 
      calories: 135, 
      time: "1 min", 
      category: "all", 
      icon: "Milk", 
      tags: ["rapido"],
      ingredients: [
        "1 pote de iogurte natural",
        "1 colher de mel",
        "1 pitada de canela"
      ],
      steps: [
        "Coloque o iogurte em uma tigela.",
        "Regue com mel e polvilhe canela.",
        "Misture e sirva."
      ],
      fitTip: "Use iogurte grego desnatado para mais proteína."
    },
    { 
      id: 77, 
      name: "Banana com Pasta de Amendoim", 
      calories: 165, 
      time: "1 min", 
      category: "frutas", 
      icon: "Banana", 
      tags: ["frutas", "rapido"],
      ingredients: [
        "1 banana",
        "1 colher de pasta de amendoim"
      ],
      steps: [
        "Corte a banana em rodelas.",
        "Espalhe a pasta de amendoim por cima.",
        "Sirva imediatamente."
      ],
      fitTip: "Use pasta de amendoim natural sem açúcar."
    },
    { 
      id: 78, 
      name: "Queijo Cottage com Mel", 
      calories: 125, 
      time: "1 min", 
      category: "all", 
      icon: "Milk", 
      tags: ["rapido"],
      ingredients: [
        "3 colheres de queijo cottage",
        "1 colher de mel"
      ],
      steps: [
        "Coloque o queijo cottage em uma tigela.",
        "Regue com mel.",
        "Misture e sirva."
      ],
      fitTip: "Queijo cottage já é baixo em calorias e rico em proteína."
    },
    { 
      id: 79, 
      name: "Biscoito com Cream Cheese", 
      calories: 145, 
      time: "1 min", 
      category: "all", 
      icon: "Cookie", 
      tags: ["rapido"],
      ingredients: [
        "3 biscoitos integrais",
        "2 colheres de cream cheese"
      ],
      steps: [
        "Espalhe o cream cheese nos biscoitos.",
        "Sirva imediatamente."
      ],
      fitTip: "Use cream cheese light e biscoitos integrais."
    },
    { 
      id: 80, 
      name: "Maçã com Manteiga de Amendoim", 
      calories: 155, 
      time: "1 min", 
      category: "frutas", 
      icon: "Apple", 
      tags: ["frutas", "rapido"],
      ingredients: [
        "1 maçã",
        "1 colher de manteiga de amendoim"
      ],
      steps: [
        "Corte a maçã em fatias.",
        "Espalhe a manteiga de amendoim.",
        "Sirva imediatamente."
      ],
      fitTip: "Use manteiga de amendoim natural sem açúcar."
    },
    { 
      id: 81, 
      name: "Aveia com Leite e Mel", 
      calories: 140, 
      time: "2 min", 
      category: "all", 
      icon: "Soup", 
      tags: ["rapido"],
      ingredients: [
        "3 colheres de aveia",
        "1 copo de leite",
        "1 colher de mel"
      ],
      steps: [
        "Misture aveia e leite em uma caneca.",
        "Leve ao micro-ondas por 1 minuto.",
        "Regue com mel e sirva."
      ],
      fitTip: "Use leite desnatado e reduza o mel."
    },
    { 
      id: 82, 
      name: "Ricota com Geleia", 
      calories: 130, 
      time: "1 min", 
      category: "all", 
      icon: "Milk", 
      tags: ["rapido"],
      ingredients: [
        "3 colheres de ricota",
        "1 colher de geleia diet"
      ],
      steps: [
        "Coloque a ricota em uma tigela.",
        "Adicione a geleia por cima.",
        "Misture e sirva."
      ],
      fitTip: "Ricota é baixa em calorias e rica em proteína."
    },
    { 
      id: 83, 
      name: "Pera com Canela", 
      calories: 95, 
      time: "1 min", 
      category: "frutas", 
      icon: "Apple", 
      tags: ["frutas", "rapido"],
      ingredients: [
        "1 pera",
        "1 colher de canela em pó"
      ],
      steps: [
        "Corte a pera em fatias.",
        "Polvilhe canela por cima.",
        "Sirva imediatamente."
      ],
      fitTip: "Pera é naturalmente doce, não precisa adicionar nada."
    },
    { 
      id: 84, 
      name: "Iogurte com Frutas Vermelhas", 
      calories: 150, 
      time: "1 min", 
      category: "frutas", 
      icon: "Cherry", 
      tags: ["frutas", "rapido"],
      ingredients: [
        "1 pote de iogurte natural",
        "1/2 xícara de frutas vermelhas"
      ],
      steps: [
        "Coloque o iogurte em uma tigela.",
        "Adicione as frutas vermelhas.",
        "Misture e sirva."
      ],
      fitTip: "Use iogurte grego desnatado para mais proteína."
    },
    { 
      id: 85, 
      name: "Queijo com Mel", 
      calories: 160, 
      time: "1 min", 
      category: "all", 
      icon: "Milk", 
      tags: ["rapido"],
      ingredients: [
        "2 fatias de queijo branco",
        "1 colher de mel"
      ],
      steps: [
        "Coloque o queijo em um prato.",
        "Regue com mel.",
        "Sirva imediatamente."
      ],
      fitTip: "Use queijo branco light para reduzir calorias."
    },
    { 
      id: 86, 
      name: "Banana com Granola", 
      calories: 145, 
      time: "1 min", 
      category: "frutas", 
      icon: "Banana", 
      tags: ["frutas", "rapido"],
      ingredients: [
        "1 banana",
        "2 colheres de granola"
      ],
      steps: [
        "Corte a banana em rodelas.",
        "Polvilhe a granola por cima.",
        "Sirva imediatamente."
      ],
      fitTip: "Use granola sem açúcar adicionado."
    },
    { 
      id: 87, 
      name: "Abacaxi com Hortelã", 
      calories: 85, 
      time: "1 min", 
      category: "frutas", 
      icon: "Apple", 
      tags: ["frutas", "rapido"],
      ingredients: [
        "3 rodelas de abacaxi",
        "Folhas de hortelã"
      ],
      steps: [
        "Corte o abacaxi em cubos.",
        "Adicione folhas de hortelã.",
        "Sirva gelado."
      ],
      fitTip: "Abacaxi é naturalmente doce e refrescante."
    },
    { 
      id: 88, 
      name: "Iogurte com Aveia", 
      calories: 155, 
      time: "1 min", 
      category: "all", 
      icon: "Milk", 
      tags: ["rapido"],
      ingredients: [
        "1 pote de iogurte natural",
        "2 colheres de aveia"
      ],
      steps: [
        "Coloque o iogurte em uma tigela.",
        "Adicione a aveia.",
        "Misture e sirva."
      ],
      fitTip: "Use iogurte desnatado e aveia integral."
    },
    { 
      id: 89, 
      name: "Kiwi com Mel", 
      calories: 100, 
      time: "1 min", 
      category: "frutas", 
      icon: "Apple", 
      tags: ["frutas", "rapido"],
      ingredients: [
        "2 kiwis",
        "1 colher de mel"
      ],
      steps: [
        "Descasque e corte os kiwis.",
        "Regue com mel.",
        "Sirva imediatamente."
      ],
      fitTip: "Kiwi é rico em vitamina C e fibras."
    },
    { 
      id: 90, 
      name: "Queijo Cottage com Frutas", 
      calories: 140, 
      time: "1 min", 
      category: "frutas", 
      icon: "Milk", 
      tags: ["frutas", "rapido"],
      ingredients: [
        "3 colheres de queijo cottage",
        "1/2 xícara de frutas picadas"
      ],
      steps: [
        "Coloque o queijo cottage em uma tigela.",
        "Adicione as frutas picadas.",
        "Misture e sirva."
      ],
      fitTip: "Queijo cottage é baixo em calorias e rico em proteína."
    },
    
    // 🥣 Mais leve + ⚡ Bem rápido (Frutas até 3min)
    { 
      id: 16, 
      name: "Banana com Cacau", 
      calories: 120, 
      time: "1 min", 
      category: "frutas", 
      icon: "Banana", 
      tags: ["frutas", "rapido"],
      ingredients: [
        "1 banana madura",
        "1 colher de cacau em pó"
      ],
      steps: [
        "Corte a banana em rodelas.",
        "Polvilhe o cacau por cima.",
        "Sirva imediatamente."
      ],
      fitTip: "Adicione canela em pó para dar mais sabor sem calorias extras."
    },
    { 
      id: 17, 
      name: "Morango com Creme", 
      calories: 110, 
      time: "2 min", 
      category: "frutas", 
      icon: "Cherry", 
      tags: ["frutas", "rapido"],
      ingredients: [
        "1 xícara de morangos",
        "2 colheres de creme de leite",
        "1 colher de açúcar"
      ],
      steps: [
        "Lave e corte os morangos.",
        "Misture creme de leite com açúcar.",
        "Cubra os morangos com o creme."
      ],
      fitTip: "Troque o creme de leite por iogurte grego natural."
    },
    { 
      id: 18, 
      name: "Maçã com Canela", 
      calories: 95, 
      time: "2 min", 
      category: "frutas", 
      icon: "Apple", 
      tags: ["frutas", "rapido"],
      ingredients: [
        "1 maçã",
        "1 colher de canela em pó",
        "1 colher de mel"
      ],
      steps: [
        "Corte a maçã em fatias.",
        "Polvilhe canela por cima.",
        "Regue com mel e sirva."
      ],
      fitTip: "Pule o mel e use apenas canela para reduzir calorias."
    },
    { 
      id: 19, 
      name: "Banana Amassada com Mel", 
      calories: 130, 
      time: "1 min", 
      category: "frutas", 
      icon: "Banana", 
      tags: ["frutas", "rapido"],
      ingredients: [
        "1 banana madura",
        "1 colher de mel"
      ],
      steps: [
        "Amasse a banana com um garfo.",
        "Misture o mel.",
        "Sirva imediatamente."
      ],
      fitTip: "Use metade do mel ou pule completamente se a banana estiver bem madura."
    },
    { 
      id: 20, 
      name: "Frutas Picadas com Iogurte", 
      calories: 140, 
      time: "3 min", 
      category: "frutas", 
      icon: "Grape", 
      tags: ["frutas", "rapido"],
      ingredients: [
        "1 banana",
        "5 morangos",
        "1 pote de iogurte natural",
        "1 colher de mel"
      ],
      steps: [
        "Pique as frutas em cubos pequenos.",
        "Misture com o iogurte.",
        "Regue com mel e sirva."
      ],
      fitTip: "Use iogurte desnatado e pule o mel."
    },
    { 
      id: 21, 
      name: "Mamão com Mel", 
      calories: 105, 
      time: "2 min", 
      category: "frutas", 
      icon: "Apple", 
      tags: ["frutas", "rapido"],
      ingredients: [
        "1 fatia de mamão",
        "1 colher de mel"
      ],
      steps: [
        "Corte o mamão em cubos.",
        "Regue com mel.",
        "Sirva gelado."
      ],
      fitTip: "O mamão já é naturalmente doce, experimente sem mel."
    },
    { 
      id: 22, 
      name: "Abacaxi Gelado", 
      calories: 90, 
      time: "1 min", 
      category: "frutas", 
      icon: "Snowflake", 
      tags: ["frutas", "rapido"],
      ingredients: [
        "3 rodelas de abacaxi congelado"
      ],
      steps: [
        "Retire o abacaxi do freezer.",
        "Deixe descongelar por 1 minuto.",
        "Sirva imediatamente."
      ],
      fitTip: "Polvilhe canela em pó para dar mais sabor sem calorias."
    },
    { 
      id: 23, 
      name: "Uvas Congeladas", 
      calories: 85, 
      time: "1 min", 
      category: "frutas", 
      icon: "Grape", 
      tags: ["frutas", "rapido"],
      ingredients: [
        "1 xícara de uvas congeladas"
      ],
      steps: [
        "Retire as uvas do freezer.",
        "Sirva imediatamente como sorvete natural."
      ],
      fitTip: "Uvas já são doces naturalmente, não precisa adicionar nada."
    },
    { 
      id: 24, 
      name: "Melancia Gelada", 
      calories: 70, 
      time: "1 min", 
      category: "frutas", 
      icon: "Snowflake", 
      tags: ["frutas", "rapido"],
      ingredients: [
        "2 fatias de melancia gelada"
      ],
      steps: [
        "Corte a melancia em cubos.",
        "Sirva bem gelada."
      ],
      fitTip: "Adicione hortelã picada para refrescar ainda mais sem calorias."
    },
    { 
      id: 25, 
      name: "Manga Picada", 
      calories: 100, 
      time: "2 min", 
      category: "frutas", 
      icon: "Apple", 
      tags: ["frutas", "rapido"],
      ingredients: [
        "1 manga madura"
      ],
      steps: [
        "Descasque e corte a manga em cubos.",
        "Sirva gelada."
      ],
      fitTip: "Manga madura é naturalmente doce, não precisa adicionar açúcar."
    },
    
    // 🥣 Mais leve (Frutas 4-5min)
    { 
      id: 26, 
      name: "Mousse de Morango", 
      calories: 150, 
      time: "5 min", 
      category: "frutas", 
      icon: "Cherry", 
      tags: ["frutas"],
      ingredients: [
        "1 xícara de morangos",
        "1 caixinha de creme de leite",
        "2 colheres de açúcar"
      ],
      steps: [
        "Bata tudo no liquidificador.",
        "Despeje em potes.",
        "Leve à geladeira por 30 minutos."
      ],
      fitTip: "Troque o creme de leite por iogurte grego e use adoçante."
    },
    { 
      id: 27, 
      name: "Banana Assada com Canela", 
      calories: 135, 
      time: "5 min", 
      category: "frutas", 
      icon: "Banana", 
      tags: ["frutas"],
      ingredients: [
        "1 banana",
        "1 colher de canela em pó",
        "1 colher de mel"
      ],
      steps: [
        "Corte a banana ao meio no sentido do comprimento.",
        "Polvilhe canela e regue com mel.",
        "Leve ao micro-ondas por 2 minutos.",
        "Sirva quente."
      ],
      fitTip: "Pule o mel e use apenas canela para reduzir calorias."
    },
    { 
      id: 28, 
      name: "Compota de Maçã Rápida", 
      calories: 115, 
      time: "5 min", 
      category: "frutas", 
      icon: "Apple", 
      tags: ["frutas"],
      ingredients: [
        "2 maçãs",
        "2 colheres de açúcar",
        "1 colher de canela",
        "2 colheres de água"
      ],
      steps: [
        "Descasque e pique as maçãs.",
        "Coloque tudo em uma tigela.",
        "Leve ao micro-ondas por 3 minutos.",
        "Mexa e sirva."
      ],
      fitTip: "Use adoçante em vez de açúcar e aumente a canela."
    },
    { 
      id: 29, 
      name: "Salada de Frutas Especial", 
      calories: 125, 
      time: "4 min", 
      category: "frutas", 
      icon: "Grape", 
      tags: ["frutas"],
      ingredients: [
        "1 banana",
        "1 maçã",
        "5 morangos",
        "1 colher de mel",
        "Suco de 1 laranja"
      ],
      steps: [
        "Pique todas as frutas em cubos.",
        "Misture com mel e suco de laranja.",
        "Sirva gelada."
      ],
      fitTip: "Pule o mel e use apenas o suco de laranja para adoçar."
    },
    { 
      id: 30, 
      name: "Creme de Frutas Vermelhas", 
      calories: 145, 
      time: "5 min", 
      category: "frutas", 
      icon: "Cherry", 
      tags: ["frutas"],
      ingredients: [
        "1 xícara de frutas vermelhas congeladas",
        "1 caixinha de creme de leite",
        "2 colheres de açúcar"
      ],
      steps: [
        "Bata as frutas com creme de leite e açúcar.",
        "Despeje em potes.",
        "Sirva imediatamente ou leve à geladeira."
      ],
      fitTip: "Use iogurte grego no lugar do creme de leite."
    },

    // 🥣 NOVAS 15 RECEITAS COM FRUTAS - MAIS LEVE
    { 
      id: 91, 
      name: "Smoothie de Morango e Banana", 
      calories: 135, 
      time: "3 min", 
      category: "frutas", 
      icon: "Cherry", 
      tags: ["frutas", "rapido"],
      ingredients: [
        "1 banana congelada",
        "1 xícara de morangos",
        "1/2 copo de leite",
        "1 colher de mel"
      ],
      steps: [
        "Bata tudo no liquidificador até ficar cremoso.",
        "Sirva imediatamente."
      ],
      fitTip: "Use leite desnatado e pule o mel se as frutas estiverem bem maduras."
    },
    { 
      id: 92, 
      name: "Espetinho de Frutas com Chocolate", 
      calories: 145, 
      time: "4 min", 
      category: "frutas", 
      icon: "Grape", 
      tags: ["frutas"],
      ingredients: [
        "1 banana",
        "5 morangos",
        "1/2 xícara de uvas",
        "3 colheres de chocolate derretido"
      ],
      steps: [
        "Corte as frutas em pedaços.",
        "Monte espetinhos alternando as frutas.",
        "Regue com chocolate derretido.",
        "Sirva imediatamente."
      ],
      fitTip: "Use chocolate 70% cacau para menos açúcar."
    },
    { 
      id: 93, 
      name: "Parfait de Frutas", 
      calories: 155, 
      time: "4 min", 
      category: "frutas", 
      icon: "Milk", 
      tags: ["frutas"],
      ingredients: [
        "1 pote de iogurte grego",
        "1/2 xícara de frutas vermelhas",
        "2 colheres de granola",
        "1 colher de mel"
      ],
      steps: [
        "Em um copo, faça camadas de iogurte, frutas e granola.",
        "Regue com mel.",
        "Sirva imediatamente."
      ],
      fitTip: "Use iogurte grego desnatado e granola sem açúcar."
    },
    { 
      id: 94, 
      name: "Salada de Frutas Tropicais", 
      calories: 120, 
      time: "5 min", 
      category: "frutas", 
      icon: "Apple", 
      tags: ["frutas"],
      ingredients: [
        "1/2 manga",
        "3 rodelas de abacaxi",
        "1 kiwi",
        "Suco de 1 limão",
        "Folhas de hortelã"
      ],
      steps: [
        "Pique todas as frutas em cubos.",
        "Misture com suco de limão.",
        "Decore com hortelã.",
        "Sirva gelada."
      ],
      fitTip: "Frutas tropicais são naturalmente doces, não precisa adicionar açúcar."
    },
    { 
      id: 95, 
      name: "Banana Split Fit", 
      calories: 165, 
      time: "3 min", 
      category: "frutas", 
      icon: "Banana", 
      tags: ["frutas", "rapido"],
      ingredients: [
        "1 banana",
        "3 colheres de iogurte grego",
        "2 morangos picados",
        "1 colher de granola"
      ],
      steps: [
        "Corte a banana ao meio no sentido do comprimento.",
        "Cubra com iogurte grego.",
        "Adicione morangos e granola por cima.",
        "Sirva imediatamente."
      ],
      fitTip: "Use iogurte grego natural sem açúcar."
    },
    { 
      id: 96, 
      name: "Mousse de Manga", 
      calories: 140, 
      time: "5 min", 
      category: "frutas", 
      icon: "Apple", 
      tags: ["frutas"],
      ingredients: [
        "1 manga madura",
        "1 caixinha de creme de leite",
        "2 colheres de açúcar"
      ],
      steps: [
        "Bata a manga com creme de leite e açúcar no liquidificador.",
        "Despeje em potes.",
        "Leve à geladeira por 30 minutos.",
        "Sirva gelado."
      ],
      fitTip: "Use creme de leite light e adoçante."
    },
    { 
      id: 97, 
      name: "Sorvete de Banana", 
      calories: 110, 
      time: "2 min", 
      category: "frutas", 
      icon: "Banana", 
      tags: ["frutas", "rapido"],
      ingredients: [
        "2 bananas congeladas",
        "1 colher de cacau em pó (opcional)"
      ],
      steps: [
        "Bata as bananas congeladas no liquidificador até virar creme.",
        "Adicione cacau se desejar.",
        "Sirva imediatamente como sorvete."
      ],
      fitTip: "Banana congelada vira sorvete naturalmente, sem açúcar!"
    },
    { 
      id: 98, 
      name: "Compota de Pera", 
      calories: 105, 
      time: "5 min", 
      category: "frutas", 
      icon: "Apple", 
      tags: ["frutas"],
      ingredients: [
        "2 peras",
        "2 colheres de açúcar",
        "1 colher de canela",
        "2 colheres de água"
      ],
      steps: [
        "Descasque e pique as peras.",
        "Coloque tudo em uma tigela.",
        "Leve ao micro-ondas por 3 minutos.",
        "Mexa e sirva quente ou frio."
      ],
      fitTip: "Use adoçante em vez de açúcar."
    },
    { 
      id: 99, 
      name: "Frutas Assadas", 
      calories: 125, 
      time: "5 min", 
      category: "frutas", 
      icon: "Apple", 
      tags: ["frutas"],
      ingredients: [
        "1 maçã",
        "1 pera",
        "1 colher de mel",
        "1 colher de canela"
      ],
      steps: [
        "Corte as frutas em fatias.",
        "Regue com mel e polvilhe canela.",
        "Leve ao micro-ondas por 3 minutos.",
        "Sirva quente."
      ],
      fitTip: "Pule o mel e use apenas canela."
    },
    { 
      id: 100, 
      name: "Creme de Abacate com Cacau", 
      calories: 155, 
      time: "3 min", 
      category: "frutas", 
      icon: "Apple", 
      tags: ["frutas", "rapido"],
      ingredients: [
        "1 abacate maduro",
        "2 colheres de cacau em pó",
        "2 colheres de mel",
        "1 colher de essência de baunilha"
      ],
      steps: [
        "Bata tudo no liquidificador até ficar cremoso.",
        "Sirva gelado."
      ],
      fitTip: "Abacate torna a receita cremosa e saudável naturalmente."
    },
    { 
      id: 101, 
      name: "Salada de Frutas Cítricas", 
      calories: 95, 
      time: "4 min", 
      category: "frutas", 
      icon: "Circle", 
      tags: ["frutas"],
      ingredients: [
        "1 laranja",
        "1 tangerina",
        "1/2 toranja",
        "Folhas de hortelã"
      ],
      steps: [
        "Descasque e corte as frutas em gomos.",
        "Misture tudo.",
        "Decore com hortelã.",
        "Sirva gelada."
      ],
      fitTip: "Frutas cítricas são baixas em calorias e ricas em vitamina C."
    },
    { 
      id: 102, 
      name: "Iogurte com Frutas Tropicais", 
      calories: 145, 
      time: "3 min", 
      category: "frutas", 
      icon: "Milk", 
      tags: ["frutas", "rapido"],
      ingredients: [
        "1 pote de iogurte natural",
        "1/2 manga picada",
        "3 rodelas de abacaxi",
        "1 colher de mel"
      ],
      steps: [
        "Coloque o iogurte em uma tigela.",
        "Adicione as frutas picadas.",
        "Regue com mel.",
        "Misture e sirva."
      ],
      fitTip: "Use iogurte grego desnatado e pule o mel."
    },
    { 
      id: 103, 
      name: "Smoothie Bowl de Açaí", 
      calories: 175, 
      time: "4 min", 
      category: "frutas", 
      icon: "Grape", 
      tags: ["frutas"],
      ingredients: [
        "1 pacote de polpa de açaí",
        "1 banana",
        "Frutas picadas para cobrir",
        "2 colheres de granola"
      ],
      steps: [
        "Bata o açaí com a banana no liquidificador.",
        "Despeje em uma tigela.",
        "Cubra com frutas e granola.",
        "Sirva imediatamente."
      ],
      fitTip: "Reduza a granola e adicione mais frutas."
    },
    { 
      id: 104, 
      name: "Gelatina de Frutas", 
      calories: 90, 
      time: "5 min", 
      category: "frutas", 
      icon: "Droplet", 
      tags: ["frutas"],
      ingredients: [
        "1 pacote de gelatina de morango",
        "1 xícara de morangos picados",
        "1 copo de água quente",
        "1 copo de água fria"
      ],
      steps: [
        "Dissolva a gelatina na água quente.",
        "Adicione a água fria e os morangos.",
        "Leve à geladeira por 2 horas.",
        "Sirva gelada."
      ],
      fitTip: "Use gelatina diet para reduzir calorias."
    },
    { 
      id: 105, 
      name: "Frutas com Iogurte e Mel", 
      calories: 150, 
      time: "3 min", 
      category: "frutas", 
      icon: "Milk", 
      tags: ["frutas", "rapido"],
      ingredients: [
        "1 pote de iogurte grego",
        "1 banana picada",
        "5 morangos picados",
        "1 colher de mel",
        "1 colher de canela"
      ],
      steps: [
        "Coloque o iogurte em uma tigela.",
        "Adicione as frutas picadas.",
        "Regue com mel e polvilhe canela.",
        "Misture e sirva."
      ],
      fitTip: "Use iogurte grego desnatado e reduza o mel."
    },
    
    // ⚡ Bem rápido (Outros até 3min, sem chocolate nem fruta base)
    { 
      id: 31, 
      name: "Leite Condensado com Biscoito", 
      calories: 190, 
      time: "1 min", 
      category: "all", 
      icon: "Cookie", 
      tags: ["rapido"],
      ingredients: [
        "3 colheres de leite condensado",
        "3 biscoitos maisena"
      ],
      steps: [
        "Quebre os biscoitos em pedaços.",
        "Misture com leite condensado.",
        "Sirva imediatamente."
      ],
      fitTip: "Use biscoito integral e reduza o leite condensado pela metade."
    },
    { 
      id: 32, 
      name: "Doce de Leite na Colher", 
      calories: 180, 
      time: "1 min", 
      category: "all", 
      icon: "Milk", 
      tags: ["rapido"],
      ingredients: [
        "3 colheres de doce de leite"
      ],
      steps: [
        "Coloque o doce de leite em uma tigela.",
        "Sirva com uma colher."
      ],
      fitTip: "Misture com iogurte natural para aumentar volume e reduzir calorias."
    },
    { 
      id: 33, 
      name: "Gelatina Instantânea", 
      calories: 80, 
      time: "2 min", 
      category: "gelado", 
      icon: "Droplet", 
      tags: ["rapido"],
      ingredients: [
        "1 pacote de gelatina",
        "1 copo de água quente",
        "1 copo de água fria"
      ],
      steps: [
        "Dissolva a gelatina na água quente.",
        "Adicione a água fria.",
        "Leve à geladeira por 2 horas."
      ],
      fitTip: "Use gelatina diet para reduzir calorias drasticamente."
    },
    { 
      id: 34, 
      name: "Iogurte com Granola", 
      calories: 160, 
      time: "1 min", 
      category: "all", 
      icon: "Milk", 
      tags: ["rapido"],
      ingredients: [
        "1 pote de iogurte natural",
        "3 colheres de granola",
        "1 colher de mel"
      ],
      steps: [
        "Coloque o iogurte em uma tigela.",
        "Adicione a granola por cima.",
        "Regue com mel."
      ],
      fitTip: "Use iogurte desnatado e reduza a granola pela metade."
    },
    { 
      id: 35, 
      name: "Mingau Doce Express", 
      calories: 170, 
      time: "3 min", 
      category: "all", 
      icon: "Soup", 
      tags: ["rapido"],
      ingredients: [
        "3 colheres de aveia",
        "1 copo de leite",
        "2 colheres de açúcar",
        "1 pitada de canela"
      ],
      steps: [
        "Misture tudo em uma caneca.",
        "Leve ao micro-ondas por 2 minutos.",
        "Mexa e sirva quente."
      ],
      fitTip: "Use leite desnatado e adoçante em vez de açúcar."
    },
    { 
      id: 36, 
      name: "Creme de Baunilha Rápido", 
      calories: 155, 
      time: "2 min", 
      category: "all", 
      icon: "Coffee", 
      tags: ["rapido"],
      ingredients: [
        "1 copo de leite",
        "2 colheres de açúcar",
        "1 colher de amido de milho",
        "1 colher de essência de baunilha"
      ],
      steps: [
        "Misture tudo em uma caneca.",
        "Leve ao micro-ondas por 1 minuto e 30 segundos.",
        "Mexa bem e sirva."
      ],
      fitTip: "Use leite desnatado e adoçante para reduzir calorias."
    },
    { 
      id: 37, 
      name: "Pudim de Leite Condensado", 
      calories: 200, 
      time: "3 min", 
      category: "all", 
      icon: "Cake", 
      tags: ["rapido"],
      ingredients: [
        "1 lata de leite condensado",
        "2 copos de leite",
        "3 ovos"
      ],
      steps: [
        "Bata tudo no liquidificador.",
        "Despeje em uma forma.",
        "Leve ao micro-ondas por 5 minutos.",
        "Deixe esfriar antes de desenformar."
      ],
      fitTip: "Use leite condensado light e leite desnatado."
    },
    { 
      id: 38, 
      name: "Sorvete com Calda", 
      calories: 210, 
      time: "1 min", 
      category: "gelado", 
      icon: "IceCream", 
      tags: ["rapido"],
      ingredients: [
        "2 bolas de sorvete",
        "2 colheres de calda de chocolate"
      ],
      steps: [
        "Coloque o sorvete em uma tigela.",
        "Regue com a calda.",
        "Sirva imediatamente."
      ],
      fitTip: "Use sorvete de frutas e pule a calda para reduzir calorias."
    },
    { 
      id: 39, 
      name: "Milk-shake Rápido", 
      calories: 220, 
      time: "2 min", 
      category: "gelado", 
      icon: "Milk", 
      tags: ["rapido"],
      ingredients: [
        "2 bolas de sorvete",
        "1 copo de leite"
      ],
      steps: [
        "Bata tudo no liquidificador.",
        "Sirva imediatamente."
      ],
      fitTip: "Use sorvete light e leite desnatado."
    },
    { 
      id: 40, 
      name: "Creme de Leite Ninho", 
      calories: 195, 
      time: "2 min", 
      category: "all", 
      icon: "Milk", 
      tags: ["rapido"],
      ingredients: [
        "1 caixinha de creme de leite",
        "3 colheres de leite em pó"
      ],
      steps: [
        "Misture tudo em uma tigela.",
        "Bata com um garfo até ficar cremoso.",
        "Sirva gelado."
      ],
      fitTip: "Use creme de leite light e reduza o leite em pó pela metade."
    },
    
    // Outros doces (4-5min, sem tags específicas ou apenas 1 tag)
    { 
      id: 41, 
      name: "Bolo de Caneca de Baunilha", 
      calories: 230, 
      time: "4 min", 
      category: "all", 
      icon: "Cake", 
      tags: [],
      ingredients: [
        "4 colheres de farinha de trigo",
        "3 colheres de açúcar",
        "1 ovo",
        "3 colheres de leite",
        "2 colheres de óleo",
        "1 colher de essência de baunilha"
      ],
      steps: [
        "Misture tudo em uma caneca.",
        "Mexa até ficar homogêneo.",
        "Leve ao micro-ondas por 3 minutos.",
        "Deixe esfriar antes de comer."
      ],
      fitTip: "Troque o óleo por iogurte natural e use farinha integral."
    },
    { 
      id: 42, 
      name: "Pudim de Caneca", 
      calories: 210, 
      time: "5 min", 
      category: "all", 
      icon: "Cake", 
      tags: [],
      ingredients: [
        "3 colheres de leite condensado",
        "1 copo de leite",
        "2 ovos",
        "1 colher de açúcar para caramelizar"
      ],
      steps: [
        "Caramelize o açúcar na caneca.",
        "Bata os outros ingredientes e despeje.",
        "Leve ao micro-ondas por 3 minutos.",
        "Deixe esfriar antes de desenformar."
      ],
      fitTip: "Use leite condensado light e leite desnatado."
    },
    { 
      id: 43, 
      name: "Pavê Simples", 
      calories: 250, 
      time: "5 min", 
      category: "all", 
      icon: "Cake", 
      tags: [],
      ingredients: [
        "1 pacote de biscoito maisena",
        "1 copo de leite",
        "1 caixinha de creme de leite",
        "3 colheres de açúcar"
      ],
      steps: [
        "Molhe os biscoitos no leite.",
        "Faça camadas de biscoito e creme.",
        "Repita até acabar os ingredientes.",
        "Leve à geladeira por 1 hora."
      ],
      fitTip: "Use biscoito integral e creme de leite light."
    },
    { 
      id: 44, 
      name: "Mousse de Limão", 
      calories: 175, 
      time: "4 min", 
      category: "all", 
      icon: "Circle", 
      tags: [],
      ingredients: [
        "1 lata de leite condensado",
        "1 caixinha de creme de leite",
        "Suco de 2 limões"
      ],
      steps: [
        "Bata tudo no liquidificador.",
        "Despeje em potes.",
        "Leve à geladeira por 30 minutos."
      ],
      fitTip: "Use leite condensado light e creme de leite light."
    },
    { 
      id: 45, 
      name: "Creme de Paçoca", 
      calories: 205, 
      time: "3 min", 
      category: "all", 
      icon: "Candy", 
      tags: ["rapido"],
      ingredients: [
        "1 caixinha de creme de leite",
        "3 paçocas",
        "2 colheres de leite condensado"
      ],
      steps: [
        "Esmigalhe as paçocas.",
        "Misture com creme de leite e leite condensado.",
        "Bata até ficar cremoso.",
        "Sirva gelado."
      ],
      fitTip: "Use creme de leite light e reduza o leite condensado."
    },
    { 
      id: 46, 
      name: "Doce de Leite Cremoso", 
      calories: 190, 
      time: "4 min", 
      category: "all", 
      icon: "Milk", 
      tags: [],
      ingredients: [
        "1 lata de leite condensado",
        "2 colheres de manteiga"
      ],
      steps: [
        "Misture tudo em uma tigela.",
        "Leve ao micro-ondas por 2 minutos.",
        "Mexa e volte por mais 1 minuto.",
        "Deixe esfriar."
      ],
      fitTip: "Use leite condensado light e reduza a manteiga."
    },
    { 
      id: 47, 
      name: "Arroz Doce Rápido", 
      calories: 185, 
      time: "5 min", 
      category: "all", 
      icon: "Soup", 
      tags: [],
      ingredients: [
        "1 xícara de arroz cozido",
        "1 copo de leite",
        "3 colheres de açúcar",
        "1 pitada de canela"
      ],
      steps: [
        "Misture arroz, leite e açúcar em uma tigela.",
        "Leve ao micro-ondas por 3 minutos.",
        "Mexa e polvilhe canela.",
        "Sirva quente ou frio."
      ],
      fitTip: "Use leite desnatado e adoçante em vez de açúcar."
    },
    { 
      id: 48, 
      name: "Canjica Express", 
      calories: 195, 
      time: "5 min", 
      category: "all", 
      icon: "Soup", 
      tags: [],
      ingredients: [
        "1 lata de milho verde",
        "1 copo de leite",
        "3 colheres de açúcar",
        "1 pitada de canela"
      ],
      steps: [
        "Bata o milho com leite no liquidificador.",
        "Adicione açúcar e misture.",
        "Leve ao micro-ondas por 2 minutos.",
        "Polvilhe canela e sirva."
      ],
      fitTip: "Use leite desnatado e adoçante."
    },
    { 
      id: 49, 
      name: "Curau Rápido", 
      calories: 180, 
      time: "5 min", 
      category: "all", 
      icon: "Soup", 
      tags: [],
      ingredients: [
        "1 lata de milho verde",
        "1 copo de leite",
        "3 colheres de açúcar",
        "1 colher de amido de milho"
      ],
      steps: [
        "Bata tudo no liquidificador.",
        "Despeje em uma panela.",
        "Leve ao micro-ondas por 3 minutos.",
        "Mexa e sirva."
      ],
      fitTip: "Use leite desnatado e reduza o açúcar pela metade."
    },
    { 
      id: 50, 
      name: "Manjar Branco", 
      calories: 165, 
      time: "4 min", 
      category: "all", 
      icon: "Cake", 
      tags: [],
      ingredients: [
        "1 copo de leite de coco",
        "1 copo de leite",
        "3 colheres de açúcar",
        "2 colheres de amido de milho"
      ],
      steps: [
        "Misture tudo em uma tigela.",
        "Leve ao micro-ondas por 2 minutos.",
        "Mexa e volte por mais 1 minuto.",
        "Deixe esfriar antes de servir."
      ],
      fitTip: "Use leite de coco light e adoçante."
    },
    
    // Mais receitas de chocolate
    { 
      id: 51, 
      name: "Beijinho de Colher", 
      calories: 175, 
      time: "2 min", 
      category: "all", 
      icon: "Candy", 
      tags: ["rapido"],
      ingredients: [
        "3 colheres de leite condensado",
        "1 colher de manteiga",
        "2 colheres de coco ralado"
      ],
      steps: [
        "Misture tudo em uma caneca.",
        "Leve ao micro-ondas por 1 minuto.",
        "Mexa e sirva."
      ],
      fitTip: "Reduza o leite condensado e aumente o coco ralado."
    },
    { 
      id: 52, 
      name: "Brigadeiro Branco", 
      calories: 185, 
      time: "3 min", 
      category: "all", 
      icon: "Candy", 
      tags: ["rapido"],
      ingredients: [
        "3 colheres de leite condensado",
        "1 colher de manteiga",
        "2 colheres de leite em pó"
      ],
      steps: [
        "Misture tudo em uma caneca.",
        "Leve ao micro-ondas por 1 minuto.",
        "Mexa e volte por mais 30 segundos.",
        "Deixe esfriar."
      ],
      fitTip: "Use leite condensado light e reduza a manteiga."
    },
    { 
      id: 53, 
      name: "Ninho com Nutella", 
      calories: 240, 
      time: "2 min", 
      category: "chocolate", 
      icon: "Cookie", 
      tags: ["chocolate", "rapido"],
      ingredients: [
        "3 colheres de leite em pó",
        "2 colheres de Nutella",
        "1 colher de leite condensado"
      ],
      steps: [
        "Misture tudo em uma tigela.",
        "Mexa até ficar cremoso.",
        "Sirva imediatamente."
      ],
      fitTip: "Reduza a Nutella pela metade e adicione cacau em pó."
    },
    { 
      id: 54, 
      name: "Chocolate com Morango", 
      calories: 155, 
      time: "2 min", 
      category: "chocolate", 
      icon: "Cherry", 
      tags: ["chocolate", "rapido"],
      ingredients: [
        "5 morangos",
        "3 colheres de chocolate derretido"
      ],
      steps: [
        "Derreta o chocolate no micro-ondas.",
        "Mergulhe os morangos no chocolate.",
        "Deixe esfriar e sirva."
      ],
      fitTip: "Use chocolate 70% cacau para menos açúcar."
    },
    { 
      id: 55, 
      name: "Trufa de Oreo", 
      calories: 200, 
      time: "3 min", 
      category: "chocolate", 
      icon: "Cookie", 
      tags: ["chocolate", "rapido"],
      ingredients: [
        "6 biscoitos Oreo",
        "2 colheres de cream cheese"
      ],
      steps: [
        "Triture os Oreos.",
        "Misture com cream cheese.",
        "Faça bolinhas e sirva."
      ],
      fitTip: "Use cream cheese light e reduza a quantidade de Oreo."
    },
    { 
      id: 56, 
      name: "Brigadeiro de Ninho", 
      calories: 190, 
      time: "3 min", 
      category: "all", 
      icon: "Candy", 
      tags: ["rapido"],
      ingredients: [
        "3 colheres de leite condensado",
        "1 colher de manteiga",
        "3 colheres de leite em pó"
      ],
      steps: [
        "Misture tudo em uma caneca.",
        "Leve ao micro-ondas por 1 minuto.",
        "Mexa e volte por mais 30 segundos.",
        "Deixe esfriar."
      ],
      fitTip: "Use leite condensado light."
    },
    { 
      id: 57, 
      name: "Mousse de Maracujá", 
      calories: 160, 
      time: "4 min", 
      category: "frutas", 
      icon: "Circle", 
      tags: ["frutas"],
      ingredients: [
        "1 caixinha de creme de leite",
        "Polpa de 2 maracujás",
        "3 colheres de açúcar"
      ],
      steps: [
        "Bata tudo no liquidificador.",
        "Despeje em potes.",
        "Leve à geladeira por 30 minutos."
      ],
      fitTip: "Use creme de leite light e adoçante."
    },
    { 
      id: 58, 
      name: "Creme de Abacate", 
      calories: 145, 
      time: "3 min", 
      category: "frutas", 
      icon: "Apple", 
      tags: ["frutas", "rapido"],
      ingredients: [
        "1 abacate maduro",
        "3 colheres de açúcar",
        "1 copo de leite"
      ],
      steps: [
        "Bata tudo no liquidificador.",
        "Sirva gelado."
      ],
      fitTip: "Use adoçante e leite desnatado."
    },
    { 
      id: 59, 
      name: "Banana Split Simples", 
      calories: 220, 
      time: "3 min", 
      category: "frutas", 
      icon: "Banana", 
      tags: ["frutas", "rapido"],
      ingredients: [
        "1 banana",
        "2 bolas de sorvete",
        "2 colheres de calda de chocolate",
        "Chantilly"
      ],
      steps: [
        "Corte a banana ao meio.",
        "Coloque o sorvete por cima.",
        "Regue com calda e chantilly."
      ],
      fitTip: "Use sorvete de frutas e pule a calda."
    },
    { 
      id: 60, 
      name: "Açaí na Tigela Rápido", 
      calories: 195, 
      time: "2 min", 
      category: "frutas", 
      icon: "Grape", 
      tags: ["frutas", "rapido"],
      ingredients: [
        "1 pacote de polpa de açaí",
        "1 banana",
        "Granola para cobrir"
      ],
      steps: [
        "Bata o açaí com a banana.",
        "Despeje em uma tigela.",
        "Cubra com granola."
      ],
      fitTip: "Reduza a granola pela metade e adicione mais frutas."
    },
  ];



  // Função para escolher receitas inteligentes (opção "Tanto faz")
  const getSmartRecipes = () => {
    const hour = new Date().getHours();
    let selectedRecipes: Recipe[] = [];

    // Lógica baseada no horário
    if (hour >= 6 && hour < 12) {
      // Manhã: receitas mais leves e rápidas
      selectedRecipes = recipes.filter(r => r.tags.includes("frutas") || r.calories < 150);
    } else if (hour >= 12 && hour < 18) {
      // Tarde: mix de tudo
      selectedRecipes = recipes.filter(r => r.tags.includes("rapido"));
    } else {
      // Noite: receitas mais indulgentes
      selectedRecipes = recipes.filter(r => r.tags.includes("chocolate"));
    }

    // Embaralha e retorna 6
    return selectedRecipes.sort(() => Math.random() - 0.5).slice(0, 6);
  };

  // Função para aplicar filtro rápido
  const applyQuickFilter = (filterType: string) => {
    setQuickFilterActive(filterType);
    setDisplayedRecipesCount(6);
    setShowOnlyFavorites(false); // Desativa filtro de favoritos ao aplicar outro filtro
  };

  // Função para obter receitas filtradas
  const getFilteredRecipes = () => {
    let filtered: Recipe[] = [];

    // Se filtro de favoritos está ativo, mostra apenas favoritos
    if (showOnlyFavorites) {
      filtered = recipes.filter(r => favorites.includes(r.id));
    } else if (quickFilterActive === "chocolate") {
      // 🍫 Bem doce (chocolate, brigadeiro)
      filtered = recipes.filter(r => r.tags.includes("chocolate"));
    } else if (quickFilterActive === "rapido") {
      // ⚡ Bem rápido (até 2 min)
      filtered = recipes.filter(r => {
        const timeInMinutes = parseInt(r.time);
        return timeInMinutes <= 2;
      });
    } else if (quickFilterActive === "frutas") {
      // 🥣 Mais leve (frutas)
      filtered = recipes.filter(r => r.tags.includes("frutas"));
    } else if (quickFilterActive === "tanto-faz") {
      // 🤷 Tanto faz (IA escolhe)
      filtered = getSmartRecipes();
    }

    return filtered;
  };

  const filteredRecipes = getFilteredRecipes();
  const displayedRecipes = filteredRecipes.slice(0, displayedRecipesCount);
  const hasMoreRecipes = displayedRecipesCount < filteredRecipes.length;

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const handleUseFitTip = (recipe: Recipe) => {
    if (!usedFitTip) {
      // Marca como usado
      setUsedFitTip(true);
      
      // Calcula redução baseada na dica fit
      let caloriesReduction = 0;
      
      if (recipe.fitTip) {
        const fitTipLower = recipe.fitTip.toLowerCase();
        
        if (fitTipLower.includes("troque") || fitTipLower.includes("substitua") || fitTipLower.includes("metade")) {
          caloriesReduction = Math.round(recipe.calories * 0.20);
        } else if (fitTipLower.includes("reduza") || fitTipLower.includes("gordura") || fitTipLower.includes("light") || fitTipLower.includes("desnatado")) {
          caloriesReduction = Math.round(recipe.calories * 0.25);
        } else if (fitTipLower.includes("adicione") || fitTipLower.includes("aumente") || fitTipLower.includes("fruta")) {
          caloriesReduction = Math.round(recipe.calories * 0.15);
        } else {
          caloriesReduction = Math.round(recipe.calories * 0.20);
        }
      }
      
      // Atualiza calorias exibidas instantaneamente
      const newCalories = recipe.calories - caloriesReduction;
      setDisplayedCalories(newCalories);
    } else {
      // Desmarca
      setUsedFitTip(false);
      setDisplayedCalories(null);
    }
  };

  const handleEatRecipe = (recipe: Recipe) => {
    // Usa as calorias exibidas (com redução se dica foi usada) ou calorias originais
    const finalCalories = displayedCalories !== null ? displayedCalories : recipe.calories;
    const caloriesReduction = recipe.calories - finalCalories;
    
    // Exibe feedback sutil
    if (usedFitTip && caloriesReduction > 0) {
      setFeedbackMessage(`Dica aplicada: −${caloriesReduction} kcal`);
      setTimeout(() => setFeedbackMessage(""), 3000);
    }

    // Aqui você pode adicionar a lógica para adicionar as calorias à contagem diária
    console.log(`Adicionando ${finalCalories} kcal à contagem diária`);
    alert(`${finalCalories} kcal adicionadas à sua contagem diária!`);
    
    // Reseta o toggle após usar
    setUsedFitTip(false);
    setDisplayedCalories(null);
  };

  const favoriteCount = favorites.length;
  const rapidasCount = recipes.filter(r => r.tags.includes("rapido")).length;
  const baixaCalCount = recipes.filter(r => r.calories < 150).length;

  // Mapeamento de ícones
  const iconMap: Record<string, any> = {
    Cookie,
    Cake,
    Coffee,
    Zap,
    Candy,
    Banana,
    Cherry,
    Apple,
    Grape,
    Snowflake,
    Milk,
    Droplet,
    Soup,
    IceCream,
    Circle,
    Croissant,
  };

  // Se uma receita está selecionada, mostra a tela de detalhes
  if (selectedRecipe) {
    const IconComponent = iconMap[selectedRecipe.icon];
    const currentCalories = displayedCalories !== null ? displayedCalories : selectedRecipe.calories;
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
        {/* Header com botão voltar */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedRecipe(null);
                setUsedFitTip(false);
                setDisplayedCalories(null);
                setFeedbackMessage("");
              }}
              className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-700" />
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-slate-800">{selectedRecipe.name}</h1>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(selectedRecipe.id);
                  }}
                  className={`flex-shrink-0 transition-all duration-300 ${
                    favorites.includes(selectedRecipe.id) ? "text-pink-500 scale-110" : "text-slate-300 hover:text-pink-500"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${favorites.includes(selectedRecipe.id) ? "fill-current" : ""}`} />
                </button>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                <div className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-orange-500" />
                  <span className={`transition-all duration-300 ${usedFitTip ? 'text-green-600 font-semibold' : ''}`}>
                    {currentCalories} kcal
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Timer className="w-3.5 h-3.5 text-blue-500" />
                  <span>{selectedRecipe.time}</span>
                </div>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
              <IconComponent className="w-6 h-6 text-pink-600" />
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6 space-y-6">
          {/* 1. INGREDIENTES */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200">
            <h2 className="text-base font-semibold text-slate-800 mb-4">Ingredientes</h2>
            <ul className="space-y-2">
              {selectedRecipe.ingredients?.map((ingredient, index) => (
                <li key={index} className="text-sm text-slate-700 leading-relaxed">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          {/* 2. MODO DE PREPARO */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200">
            <h2 className="text-base font-semibold text-slate-800 mb-4">Modo de Preparo</h2>
            <ol className="space-y-3">
              {selectedRecipe.steps?.map((step, index) => (
                <li key={index} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-100 text-pink-600 font-semibold flex items-center justify-center text-xs">
                    {index + 1}
                  </span>
                  <span className="flex-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* 3. DICA FIT COM CHECKBOX */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-200">
            <h2 className="text-base font-semibold text-green-800 mb-3">Dica Fit</h2>
            <p className="text-sm text-green-700 leading-relaxed mb-3">
              {selectedRecipe.fitTip}
            </p>
            
            {/* Checkbox discreto */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={usedFitTip}
                onChange={() => handleUseFitTip(selectedRecipe)}
                className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-xs text-gray-500">Usei essa dica</span>
            </label>
          </div>

          {/* BOTÃO "VOU COMER" */}
          <div className="space-y-2">
            <button
              onClick={() => handleEatRecipe(selectedRecipe)}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold text-sm shadow-lg shadow-pink-500/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Vou comer
            </button>
            
            {/* Feedback sutil */}
            {feedbackMessage && (
              <p className="text-xs text-center text-green-600 animate-fade-in">
                {feedbackMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Tela principal com lista de receitas
  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 shadow-2xl shadow-pink-500/30 mb-2">
          <Heart className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-lg font-inter font-semibold text-slate-800">
          SOS Doce
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Receitas rápidas para matar a vontade
        </p>
      </div>

      {/* BOTÃO FAVORITOS - NOVO */}
      {favorites.length > 0 && !quickFilterActive && (
        <button
          onClick={() => {
            setShowOnlyFavorites(true);
            setQuickFilterActive("favorites");
            setDisplayedRecipesCount(6);
          }}
          className="w-full p-3 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 hover:border-pink-300 transition-all duration-300 flex items-center justify-between group hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
              <Heart className="w-5 h-5 text-pink-600 fill-current" />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-slate-800">Minhas Favoritas</div>
              <div className="text-xs text-slate-500">{favorites.length} receita{favorites.length !== 1 ? 's' : ''}</div>
            </div>
          </div>
          <div className="text-pink-500">→</div>
        </button>
      )}

      {/* FILTROS RÁPIDOS */}
      {!quickFilterActive && (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => applyQuickFilter("chocolate")}
              className="p-3 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 hover:border-amber-300 transition-all duration-300 text-left group hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="text-xl mb-1">🍫</div>
              <div className="text-xs font-semibold text-slate-800 mb-0.5">Bem doce</div>
              <div className="text-[10px] text-slate-500">chocolate, brigadeiro</div>
            </button>

            <button
              onClick={() => applyQuickFilter("rapido")}
              className="p-3 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 text-left group hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="text-xl mb-1">⚡</div>
              <div className="text-xs font-semibold text-slate-800 mb-0.5">Bem rápido</div>
              <div className="text-[10px] text-slate-500">mata vontade em 2 min</div>
            </button>

            <button
              onClick={() => applyQuickFilter("frutas")}
              className="p-3 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:border-green-300 transition-all duration-300 text-left group hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="text-xl mb-1">🥣</div>
              <div className="text-xs font-semibold text-slate-800 mb-0.5">Mais leve</div>
              <div className="text-[10px] text-slate-500">doce com frutas</div>
            </button>

            <button
              onClick={() => applyQuickFilter("tanto-faz")}
              className="p-3 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 hover:border-purple-300 transition-all duration-300 text-left group hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="text-xl mb-1">🤷</div>
              <div className="text-xs font-semibold text-slate-800 mb-0.5">Tanto faz</div>
              <div className="text-[10px] text-slate-500">escolhe por mim</div>
            </button>
          </div>
        </div>
      )}

      {/* HEADER COM FILTRO ATIVO */}
      {quickFilterActive && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setQuickFilterActive(null);
                setShowOnlyFavorites(false);
                setDisplayedRecipesCount(6);
              }}
              className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-700" />
            </button>
            <div>
              <h3 className="text-sm font-semibold text-slate-800">
                {quickFilterActive === "favorites" && "❤️ Minhas Favoritas"}
                {quickFilterActive === "chocolate" && "🍫 Bem doce"}
                {quickFilterActive === "rapido" && "⚡ Bem rápido"}
                {quickFilterActive === "frutas" && "🥣 Mais leve"}
                {quickFilterActive === "tanto-faz" && "🤷 Escolhi por você"}
              </h3>
              <p className="text-[10px] text-slate-500">{filteredRecipes.length} receitas</p>
            </div>
          </div>
        </div>
      )}

      {/* Recipes Grid - SÓ MOSTRA SE FILTRO ATIVO */}
      {quickFilterActive && (
        <div className="space-y-2">
          {filteredRecipes.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-500">Nenhuma receita favorita ainda</p>
              <p className="text-xs text-slate-400 mt-1">Favorite receitas para vê-las aqui</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2">
                {displayedRecipes.map((recipe) => (
                  <RecipeCard 
                    key={recipe.id} 
                    {...recipe} 
                    favorite={favorites.includes(recipe.id)}
                    onToggleFavorite={() => toggleFavorite(recipe.id)}
                    onSelect={() => setSelectedRecipe(recipe)}
                    IconComponent={iconMap[recipe.icon]}
                  />
                ))}
              </div>

              {/* Botão "Ver outras opções" */}
              {hasMoreRecipes && (
                <button
                  onClick={() => setDisplayedRecipesCount(prev => prev + 6)}
                  className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 font-medium text-xs hover:bg-slate-200 transition-all duration-200"
                >
                  Ver outras opções
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function QuickStat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="p-3 rounded-2xl bg-white border border-slate-200 text-center">
      <Icon className="w-5 h-5 text-slate-600 mb-2 mx-auto" />
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className="text-lg font-bold text-slate-800">{value}</p>
    </div>
  );
}

function RecipeCard({
  name,
  calories,
  time,
  favorite,
  IconComponent,
  onToggleFavorite,
  onSelect,
}: {
  name: string;
  calories: number;
  time: string;
  favorite: boolean;
  IconComponent: any;
  onToggleFavorite: () => void;
  onSelect: () => void;
}) {
  return (
    <div 
      onClick={onSelect}
      className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 cursor-pointer group"
    >
      <div className="flex flex-col gap-2">
        {/* Icon e Favorito */}
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <IconComponent className="w-5 h-5 text-pink-600" />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className={`flex-shrink-0 transition-colors ${
              favorite ? "text-pink-500" : "text-slate-300 hover:text-pink-500"
            }`}
          >
            <Heart className={`w-4 h-4 ${favorite ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Nome */}
        <h4 className="font-semibold text-xs text-slate-800 line-clamp-2 leading-tight">{name}</h4>

        {/* Info */}
        <div className="flex items-center gap-2 text-[10px] text-slate-500">
          <div className="flex items-center gap-1">
            <Flame className="w-3 h-3 text-orange-500" />
            <span>{calories}</span>
          </div>
          <div className="flex items-center gap-1">
            <Timer className="w-3 h-3 text-blue-500" />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
