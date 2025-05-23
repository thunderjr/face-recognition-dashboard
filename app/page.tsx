"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Camera, Clock, Clock3, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

// Dados mockados
const metrics = {
  totalFaces: 247,
  facesPerHour: 45,
  facesPerMinute: 3,
}

const detections = [
  {
    timestamp: "2025-05-23T14:32:15Z",
    distance: 2.3,
    age: 28,
    gender: "male",
    expression: "surprised",
  },
  {
    timestamp: "2025-05-23T14:31:42Z",
    distance: 1.8,
    age: 34,
    gender: "female",
    expression: "happy",
  },
  {
    timestamp: "2025-05-23T14:30:18Z",
    distance: 3.1,
    age: 42,
    gender: "male",
    expression: "neutral",
  },
  {
    timestamp: "2025-05-23T14:29:55Z",
    distance: 2.5,
    age: 19,
    gender: "female",
    expression: "neutral",
  },
  {
    timestamp: "2025-05-23T14:28:30Z",
    distance: 1.5,
    age: 31,
    gender: "male",
    expression: "happy",
  },
  {
    timestamp: "2025-05-23T14:27:12Z",
    distance: 2.8,
    age: 25,
    gender: "female",
    expression: "surprised",
  },
  {
    timestamp: "2025-05-23T14:26:45Z",
    distance: 3.2,
    age: 50,
    gender: "male",
    expression: "sad",
  },
  {
    timestamp: "2025-05-23T14:25:20Z",
    distance: 2.0,
    age: 37,
    gender: "female",
    expression: "happy",
  },
]

// Função para formatar timestamp
const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString()
}

// Função para traduzir expressão
const translateExpression = (expression: string) => {
  const translations: Record<string, string> = {
    happy: "Feliz",
    sad: "Triste",
    neutral: "Neutro",
    surprised: "Surpreso",
    angry: "Irritado",
  }
  return translations[expression] || expression
}

// Função para traduzir gênero
const translateGender = (gender: string) => {
  return gender === "male" ? "Masculino" : "Feminino"
}

export default function FacialRecognitionDashboard() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [cameraActive, setCameraActive] = useState(false)

  useEffect(() => {
    let stream: MediaStream | null = null

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setCameraActive(true)
        }
      } catch (err) {
        console.error("Erro ao acessar a câmera:", err)
      }
    }

    if (cameraActive) {
      startCamera()
    } else if (stream) {
      stream.getTracks().forEach((track) => track.stop())
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [cameraActive])

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white p-6 gap-6">
      <h1 className="text-2xl font-bold">Dashboard de Reconhecimento Facial</h1>

      {/* Cards de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total de Pessoas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-6 w-6 text-blue-400 mr-2" />
              <div className="text-3xl font-bold">{metrics.totalFaces}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Rostos/Hora</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-blue-400 mr-2" />
              <div className="text-3xl font-bold">{metrics.facesPerHour}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Rostos/Minuto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock3 className="h-6 w-6 text-blue-400 mr-2" />
              <div className="text-3xl font-bold">{metrics.facesPerMinute}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Layout principal com lista de detecções e webcam */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        {/* Lista de últimas detecções */}
        <div className="flex-1">
          <Card className="bg-slate-800 border-slate-700 h-full">
            <CardHeader>
              <CardTitle>Últimas Detecções</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto max-h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-400">Horário</TableHead>
                      <TableHead className="text-slate-400">Distância (m)</TableHead>
                      <TableHead className="text-slate-400">Idade Est.</TableHead>
                      <TableHead className="text-slate-400">Gênero</TableHead>
                      <TableHead className="text-slate-400">Expressão</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {detections.map((detection, index) => (
                      <TableRow key={index} className="border-slate-700">
                        <TableCell>{formatTimestamp(detection.timestamp)}</TableCell>
                        <TableCell>{detection.distance.toFixed(1)}</TableCell>
                        <TableCell>{detection.age}</TableCell>
                        <TableCell>{translateGender(detection.gender)}</TableCell>
                        <TableCell>{translateExpression(detection.expression)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Área da webcam */}
        <div className="w-full lg:w-[30%]">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Câmera</span>
                <Button
                  variant={cameraActive ? "destructive" : "default"}
                  size="sm"
                  onClick={() => setCameraActive(!cameraActive)}
                >
                  {cameraActive ? "Desativar" : "Ativar"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-slate-700 rounded-lg flex items-center justify-center overflow-hidden">
                {cameraActive ? (
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                ) : (
                  <Camera className="h-12 w-12 text-slate-500" />
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
