"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Notification } from "@/components/ui/Notification";
import { 
  Trophy, 
  Gift, 
  Camera, 
  Receipt, 
  Store, 
  TrendingUp,
  Award,
  Star,
  Users,
  Target,
  Calendar,
  Plus,
  CheckCircle,
  Clock,
  Zap,
  LogOut,
  Bell,
  Settings,
  Camera as CameraIcon,
  FileText,
  MessageSquare
} from "lucide-react";
import { formatPoints } from "@/lib/utils";

interface UserData {
  name: string;
  businessName: string;
  points: number;
  level: string;
  rank: number;
  totalMembers: number;
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  points: number;
  deadline: string;
  status: string;
  icon: React.ReactElement;
  type: string;
}

interface Reward {
  id: number;
  title: string;
  description: string;
  points: number;
  icon: React.ReactElement;
  available: boolean;
}

interface Activity {
  id: number;
  type: string;
  description: string;
  points: number;
  date: string;
  icon: React.ReactElement;
}

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentChallenges, setCurrentChallenges] = useState<Challenge[]>([]);
  const [availableRewards, setAvailableRewards] = useState<Reward[]>([]);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [selectedReward, setSelectedReward] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    } else {
      // Datos por defecto si no hay usuario registrado
      setUserData({
        name: "Juan Pérez",
        businessName: "Almacén El Barrio",
        points: 1250,
        level: "Bronce",
        rank: 45,
        totalMembers: 1247
      });
    }
  }, []);

  // Datos iniciales de desafíos
  useEffect(() => {
    setCurrentChallenges([
      {
        id: 1,
        title: "Foto de Estantería Coca-Cola",
        description: "Sube una foto de tu estantería con productos Coca-Cola",
        points: 50,
        deadline: "2024-01-15",
        status: "active",
        icon: <Camera className="w-5 h-5" />,
        type: "photo"
      },
      {
        id: 2,
        title: "Cargar Boleta de Compra",
        description: "Comparte una boleta de compra de esta semana",
        points: 30,
        deadline: "2024-01-12",
        status: "active",
        icon: <Receipt className="w-5 h-5" />,
        type: "receipt"
      },
      {
        id: 3,
        title: "Reportar Precios",
        description: "Actualiza precios de productos lácteos",
        points: 25,
        deadline: "2024-01-10",
        status: "completed",
        icon: <Store className="w-5 h-5" />,
        type: "prices"
      },
      {
        id: 4,
        title: "Encuesta de Satisfacción",
        description: "Responde preguntas sobre tu experiencia",
        points: 15,
        deadline: "2024-01-08",
        status: "active",
        icon: <MessageSquare className="w-5 h-5" />,
        type: "survey"
      }
    ]);

    setAvailableRewards([
      {
        id: 1,
        title: "Recarga $10.000",
        description: "Recarga de celular Entel",
        points: 1000,
        image: "📱",
        category: "recarga"
      },
      {
        id: 2,
        title: "Gift Card Jumbo",
        description: "Tarjeta de regalo $15.000",
        points: 1500,
        image: "🛒",
        category: "gift-card"
      },
      {
        id: 3,
        title: "Kit Promocional",
        description: "Caja sorpresa con productos",
        points: 800,
        image: "🎁",
        category: "kit"
      },
      {
        id: 4,
        title: "Estantería Metálica",
        description: "Estantería para tu almacén",
        points: 2500,
        image: "📦",
        category: "equipment"
      }
    ]);

    setRecentActivity([
      {
        id: 1,
        action: "Completaste desafío",
        description: "Foto de estantería +30 pts",
        points: 30,
        date: "Hace 2 horas",
        type: "earned"
      },
      {
        id: 2,
        action: "Canjeaste premio",
        description: "Recarga $5.000 -500 pts",
        points: -500,
        date: "Ayer",
        type: "spent"
      },
      {
        id: 3,
        action: "Completaste encuesta",
        description: "Sobre productos lácteos +15 pts",
        points: 15,
        date: "Hace 3 días",
        type: "earned"
      }
    ]);
  }, []);

  const stats = userData ? [
    {
      label: "Puntos Totales",
      value: formatPoints(userData.points),
      icon: <Trophy className="w-6 h-6" />,
      color: "text-blue-600"
    },
    {
      label: "Nivel Actual",
      value: userData.level,
      icon: <Star className="w-6 h-6" />,
      color: "text-orange-500"
    },
    {
      label: "Ranking",
      value: `#${userData.rank}`,
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-green-600"
    },
    {
      label: "Miembros",
      value: formatPoints(userData.totalMembers),
      icon: <Users className="w-6 h-6" />,
      color: "text-purple-600"
    }
  ] : [];

  const handleParticipate = (challenge) => {
    setSelectedChallenge(challenge);
    setModalType("challenge");
    setShowModal(true);
  };

  const handleRedeem = (reward) => {
    setSelectedReward(reward);
    setModalType("reward");
    setShowModal(true);
  };

  const completeChallenge = async (challengeId) => {
    setIsLoading(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Actualizar estado
    setCurrentChallenges(prev => 
      prev.map(challenge => 
        challenge.id === challengeId 
          ? { ...challenge, status: "completed" }
          : challenge
      )
    );

    // Agregar actividad
    const newActivity = {
      id: Date.now(),
      action: "Completaste desafío",
      description: `${selectedChallenge.title} +${selectedChallenge.points} pts`,
      points: selectedChallenge.points,
      date: "Ahora",
      type: "earned"
    };
    setRecentActivity(prev => [newActivity, ...prev]);

    // Actualizar puntos del usuario
    if (userData) {
      const newPoints = userData.points + selectedChallenge.points;
      const updatedUserData = { ...userData, points: newPoints };
      setUserData(updatedUserData);
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
    }

    setNotification({
      type: "success",
      message: `¡Desafío completado! Ganaste ${selectedChallenge.points} puntos.`
    });

    setIsLoading(false);
    setShowModal(false);
    setSelectedChallenge(null);
  };

  const redeemReward = async () => {
    if (!userData || userData.points < selectedReward.points) {
      setNotification({
        type: "error",
        message: "No tienes suficientes puntos para canjear este premio."
      });
      return;
    }

    setIsLoading(true);
    
    // Simular canje
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Actualizar puntos del usuario
    const newPoints = userData.points - selectedReward.points;
    const updatedUserData = { ...userData, points: newPoints };
    setUserData(updatedUserData);
    localStorage.setItem('userData', JSON.stringify(updatedUserData));

    // Agregar actividad
    const newActivity = {
      id: Date.now(),
      action: "Canjeaste premio",
      description: `${selectedReward.title} -${selectedReward.points} pts`,
      points: -selectedReward.points,
      date: "Ahora",
      type: "spent"
    };
    setRecentActivity(prev => [newActivity, ...prev]);

    setNotification({
      type: "success",
      message: `¡Premio canjeado exitosamente! ${selectedReward.title}`
    });

    setIsLoading(false);
    setShowModal(false);
    setSelectedReward(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    window.location.href = '/';
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      <Notification
        type={notification?.type || "info"}
        message={notification?.message || ""}
        isVisible={!!notification}
        onClose={() => setNotification(null)}
      />

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Club Almacén+</h1>
                <p className="text-sm text-gray-500">Dashboard</p>
              </div>
            </div>
            
                          <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => router.push('/profile')}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Mi Perfil"
                >
                  <Settings className="w-5 h-5" />
                </button>
              <div className="text-right">
                <p className="text-sm text-gray-500">Bienvenido,</p>
                <p className="font-medium text-gray-900">{userData.name}</p>
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <div className={`${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", label: "Resumen", icon: <Target className="w-4 h-4" /> },
                { id: "challenges", label: "Desafíos", icon: <Zap className="w-4 h-4" /> },
                { id: "rewards", label: "Premios", icon: <Gift className="w-4 h-4" /> },
                { id: "activity", label: "Actividad", icon: <Calendar className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {/* Desafíos Activos */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Desafíos Activos
                  </h3>
                  <div className="space-y-4">
                    {currentChallenges.filter(c => c.status === "active").slice(0, 2).map((challenge) => (
                      <div
                        key={challenge.id}
                        className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg p-4 border border-blue-100"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                              <div className="text-white">
                                {challenge.icon}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{challenge.title}</h4>
                              <p className="text-sm text-gray-600">{challenge.description}</p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="text-sm text-green-600 font-medium">
                                  +{challenge.points} pts
                                </span>
                                <span className="text-sm text-gray-500">
                                  Vence: {challenge.deadline}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleParticipate(challenge)}
                          >
                            Participar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actividad Reciente */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Actividad Reciente
                  </h3>
                  <div className="space-y-3">
                    {recentActivity.slice(0, 3).map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                          <p className="text-xs text-gray-500">{activity.date}</p>
                        </div>
                        <span className={`font-medium ${
                          activity.type === 'earned' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {activity.points > 0 ? '+' : ''}{activity.points} pts
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "challenges" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Desafíos Disponibles
                  </h3>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Desafío
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentChallenges.map((challenge) => (
                    <div
                      key={challenge.id}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                          <div className="text-white">
                            {challenge.icon}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {challenge.status === "completed" ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <Clock className="w-5 h-5 text-orange-500" />
                          )}
                          <span className={`text-sm font-medium ${
                            challenge.status === "completed" ? "text-green-600" : "text-orange-600"
                          }`}>
                            {challenge.status === "completed" ? "Completado" : "Activo"}
                          </span>
                        </div>
                      </div>
                      
                      <h4 className="font-semibold text-gray-900 mb-2">{challenge.title}</h4>
                      <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-600">
                          +{challenge.points} pts
                        </span>
                        {challenge.status === "active" && (
                          <Button 
                            size="sm"
                            onClick={() => handleParticipate(challenge)}
                          >
                            Participar
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "rewards" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Premios Disponibles
                  </h3>
                  <div className="text-sm text-gray-500">
                    Tienes {formatPoints(userData.points)} puntos disponibles
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {availableRewards.map((reward) => (
                    <div
                      key={reward.id}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="text-4xl mb-4">{reward.image}</div>
                      <h4 className="font-semibold text-gray-900 mb-2">{reward.title}</h4>
                      <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-blue-600">
                          {formatPoints(reward.points)} pts
                        </span>
                        <Button 
                          size="sm" 
                          disabled={userData.points < reward.points}
                          onClick={() => handleRedeem(reward)}
                        >
                          Canjear
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "activity" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Historial de Actividad
                </h3>
                
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.type === 'earned' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {activity.type === 'earned' ? (
                            <Plus className="w-4 h-4 text-green-600" />
                          ) : (
                            <Gift className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`font-bold ${
                          activity.type === 'earned' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {activity.points > 0 ? '+' : ''}{activity.points} pts
                        </span>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => !isLoading && setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {modalType === "challenge" && selectedChallenge && (
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="text-white">
                        {selectedChallenge.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {selectedChallenge.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        +{selectedChallenge.points} puntos
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    {selectedChallenge.description}
                  </p>

                  {selectedChallenge.type === "photo" && (
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <CameraIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">Haz clic para subir una foto</p>
                        <p className="text-sm text-gray-500">o arrastra y suelta</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="w-full"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            completeChallenge(selectedChallenge.id, { file: e.target.files[0] });
                          }
                        }}
                      />
                    </div>
                  )}

                  {selectedChallenge.type === "receipt" && (
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">Sube una foto de tu boleta</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="w-full"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            completeChallenge(selectedChallenge.id, { file: e.target.files[0] });
                          }
                        }}
                      />
                    </div>
                  )}

                  {selectedChallenge.type === "prices" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Leche 1L
                          </label>
                          <input
                            type="number"
                            placeholder="$"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pan de Molde
                          </label>
                          <input
                            type="number"
                            placeholder="$"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                      <Button
                        onClick={() => completeChallenge(selectedChallenge.id, { prices: {} })}
                        disabled={isLoading}
                        className="w-full"
                      >
                        {isLoading ? "Enviando..." : "Enviar Precios"}
                      </Button>
                    </div>
                  )}

                  {selectedChallenge.type === "survey" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ¿Cómo calificarías tu experiencia con Club Almacén+?
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                          <option>Excelente</option>
                          <option>Muy buena</option>
                          <option>Buena</option>
                          <option>Regular</option>
                          <option>Mala</option>
                        </select>
                      </div>
                      <Button
                        onClick={() => completeChallenge(selectedChallenge.id, { survey: {} })}
                        disabled={isLoading}
                        className="w-full"
                      >
                        {isLoading ? "Enviando..." : "Enviar Encuesta"}
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {modalType === "reward" && selectedReward && (
                <div>
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">{selectedReward.image}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {selectedReward.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {selectedReward.description}
                    </p>
                    <div className="text-2xl font-bold text-blue-600">
                      {formatPoints(selectedReward.points)} puntos
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Puntos disponibles:</span>
                        <span className="font-semibold">{formatPoints(userData.points)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Puntos después del canje:</span>
                        <span className="font-semibold">
                          {formatPoints(userData.points - selectedReward.points)}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        onClick={() => setShowModal(false)}
                        disabled={isLoading}
                        className="flex-1"
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={redeemReward}
                        disabled={isLoading || userData.points < selectedReward.points}
                        className="flex-1"
                      >
                        {isLoading ? "Canjeando..." : "Confirmar Canje"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 