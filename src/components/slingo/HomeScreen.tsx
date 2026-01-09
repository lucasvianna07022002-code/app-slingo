"use client";

import { Coffee, Sun, Moon, Flame, Droplets, Activity, ChevronRight, Plus } from "lucide-react";
import { useMealStorage } from "@/lib/hooks/useMealStorage";
import { useWorkoutStorage } from "@/lib/hooks/useWorkoutStorage";
import { Meal } from "@/lib/types/meal";
import { useState, useEffect } from "react";

interface HomeScreenProps {
  onAddMeal: () => void;
  onAddWorkout: () => void;
}

export default function HomeScreen({ onAddMeal, onAddWorkout }: HomeScreenProps) {
  const { getDailyTotals, getMealsByType } = useMealStorage();
  const { hasWorkoutToday } = useWorkoutStorage();
  const dailyTotals = getDailyTotals();
  const [mounted, setMounted] = useState(false);
  const [today, setToday] = useState("");

  useEffect(() => {
    setMounted(true);
    setToday(new Date().toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }));
  }, []);

  // Metas diárias (ajustadas com treino)
  const BASE_CALORIES = 2000;
  const adjustedCalorieGoal = BASE_CALORIES + dailyTotals.caloriesBurned;

  const DAILY_GOALS = {
    calories: adjustedCalorieGoal,
    water: 2.5,
    protein: 80,
    carbs: 250,
  };

  const getMealInfo = (type: Meal["type"]) => {
    const meals = getMealsByType(type);
    if (meals.length === 0) {
      return {
        time: "--:--",
        items: [],
        calories: 0,
        completed: false,
      };
    }

    const lastMeal = meals[meals.length - 1];
    const time = new Date(lastMeal.timestamp).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const items = lastMeal.foods.map((food) => food.name);

    return {
      time,
      items,
      calories: lastMeal.totalNutrition.calories,
      completed: true,
    };
  };

  const breakfastInfo = getMealInfo("breakfast");
  const lunchInfo = getMealInfo("lunch");
  const dinnerInfo = getMealInfo("dinner");
  const snackInfo = getMealInfo("snack");

  const hasAnyMeal = breakfastInfo.completed || lunchInfo.completed || dinnerInfo.completed || snackInfo.completed;

  // Formatação consistente de números
  const formatNumber = (num: number): string => {
    return num.toLocaleString('pt-BR');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Date Header */}
      <div className="text-center">
        <p className="text-sm text-slate-500 capitalize" suppressHydrationWarning>
          {mounted ? today : "Carregando..."}
        </p>
        <h2 className="text-xl font-inter font-semibold text-slate-800 mt-1">
          Seu Dia Alimentar
        </h2>
      </div>

      {/* Daily Stats - Calorias, Carboidratos e Proteína */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard
          icon={Flame}
          label="Calorias"
          value={dailyTotals.calories.toString()}
          target={formatNumber(DAILY_GOALS.calories)}
          color="orange"
          progress={(dailyTotals.calories / DAILY_GOALS.calories) * 100}
          mounted={mounted}
        />
        <StatCard
          icon={Activity}
          label="Carboidratos"
          value={`${dailyTotals.carbs}g`}
          target={`${DAILY_GOALS.carbs}g`}
          color="blue"
          progress={(dailyTotals.carbs / DAILY_GOALS.carbs) * 100}
          mounted={mounted}
        />
        <StatCard
          icon={Activity}
          label="Proteína"
          value={`${dailyTotals.protein}g`}
          target={`${DAILY_GOALS.protein}g`}
          color="green"
          progress={(dailyTotals.protein / DAILY_GOALS.protein) * 100}
          mounted={mounted}
        />
      </div>

      {/* Macros Summary */}
      {hasAnyMeal && (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Macronutrientes de Hoje</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-xs text-slate-500 mb-1">Carboidratos</p>
              <p className="text-lg font-bold text-blue-600">{dailyTotals.carbs}g</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500 mb-1">Proteínas</p>
              <p className="text-lg font-bold text-green-600">{dailyTotals.protein}g</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500 mb-1">Gorduras</p>
              <p className="text-lg font-bold text-purple-600">{dailyTotals.fat}g</p>
            </div>
          </div>
        </div>
      )}

      {/* Water Bar - Nova posição */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30 flex items-center justify-center">
              <Droplets className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Água</p>
              <p className="text-xs text-slate-500">0L de {DAILY_GOALS.water}L</p>
            </div>
          </div>
          <button className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-lg transition-colors">
            + 250ml
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-500"
            style={{ width: `0%` }}
          />
        </div>
      </div>

      {/* Meals Timeline */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-700 px-1">Refeições de Hoje</h3>
        
        <MealCard
          icon={Coffee}
          title="Café da Manhã"
          time={breakfastInfo.time}
          items={breakfastInfo.items}
          calories={breakfastInfo.calories}
          completed={breakfastInfo.completed}
          onAdd={onAddMeal}
        />

        <MealCard
          icon={Sun}
          title="Almoço"
          time={lunchInfo.time}
          items={lunchInfo.items}
          calories={lunchInfo.calories}
          completed={lunchInfo.completed}
          onAdd={onAddMeal}
        />

        <MealCard
          icon={Moon}
          title="Jantar"
          time={dinnerInfo.time}
          items={dinnerInfo.items}
          calories={dinnerInfo.calories}
          completed={dinnerInfo.completed}
          onAdd={onAddMeal}
        />

        <MealCard
          icon={Plus}
          title="Outros"
          time={snackInfo.time}
          items={snackInfo.items}
          calories={snackInfo.calories}
          completed={snackInfo.completed}
          onAdd={onAddMeal}
          isOther={true}
        />
      </div>

      {/* Ajustes do dia - Seção discreta após as refeições */}
      <div className="pt-4 border-t border-slate-200">
        <h3 className="text-sm font-semibold text-slate-700 mb-3 px-1">Ajustes do dia</h3>
        
        <button
          onClick={onAddWorkout}
          className="w-full flex items-center justify-between py-2 px-1 hover:bg-slate-50 rounded-lg transition-colors group"
        >
          <span className="text-sm text-slate-600 group-hover:text-slate-800">
            • Atividade física (opcional)
          </span>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
        </button>
      </div>

      {/* Daily Tip - Removida mensagem "Bem-vindo ao Slingo!" */}
      {hasAnyMeal && (
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/60">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">
                Continue assim!
              </h4>
              <p className="text-sm text-blue-700 leading-relaxed">
                Você está no caminho certo. Continue registrando suas refeições para melhores resultados.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  target,
  color,
  progress,
  mounted,
}: {
  icon: any;
  label: string;
  value: string;
  target: string;
  color: "orange" | "blue" | "green";
  progress: number;
  mounted: boolean;
}) {
  const colorClasses = {
    orange: "from-orange-500 to-orange-600 shadow-orange-500/30",
    blue: "from-blue-500 to-blue-600 shadow-blue-500/30",
    green: "from-emerald-500 to-emerald-600 shadow-emerald-500/30",
  };

  const bgClasses = {
    orange: "bg-orange-50 border-orange-100",
    blue: "bg-blue-50 border-blue-100",
    green: "bg-emerald-50 border-emerald-100",
  };

  const progressColors = {
    orange: "bg-orange-500",
    blue: "bg-blue-500",
    green: "bg-emerald-500",
  };

  return (
    <div className={`p-4 rounded-2xl border ${bgClasses[color]} transition-all duration-300 hover:scale-105`}>
      <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-lg flex items-center justify-center mb-3`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className="text-lg font-bold text-slate-800">{value}</p>
      <p className="text-xs text-slate-400 mb-2" suppressHydrationWarning>
        de {mounted ? target : target}
      </p>
      
      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${progressColors[color]} transition-all duration-500`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}

function MealCard({
  icon: Icon,
  title,
  time,
  items,
  calories,
  completed,
  onAdd,
  isOther = false,
}: {
  icon: any;
  title: string;
  time: string;
  items: string[];
  calories: number;
  completed: boolean;
  onAdd?: () => void;
  isOther?: boolean;
}) {
  return (
    <div
      className={`p-4 rounded-2xl border transition-all duration-300 ${
        completed
          ? "bg-white border-slate-200 hover:border-slate-300"
          : "bg-slate-50/50 border-slate-200 border-dashed hover:bg-slate-100/50 cursor-pointer"
      }`}
      onClick={!completed ? onAdd : undefined}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            completed
              ? "bg-gradient-to-br from-slate-600 to-slate-700 shadow-lg shadow-slate-500/20"
              : "bg-slate-200"
          }`}
        >
          <Icon className={`w-5 h-5 ${completed ? "text-white" : "text-slate-400"}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-slate-800">{title}</h4>
            <span className="text-xs text-slate-500">{time}</span>
          </div>
          {completed ? (
            <>
              <p className="text-sm text-slate-600 mb-2">{items.join(" • ")}</p>
              <div className="flex items-center gap-2">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-xs font-medium text-slate-700">{calories} kcal</span>
              </div>
            </>
          ) : (
            <p className="text-sm text-slate-400">
              {isOther ? "Adicionar lanches ou extras" : "Toque para adicionar refeição"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
