{import { useState } from 'react';
import { Play, Settings, Zap, Cpu, Monitor, Gamepad2 } from 'lucide-react';
import { Toaster, toast } from 'sonner';

const gpuDetect = () => {
  return {
    renderer: "Mali-G57",
    preset: {
      zink: true,
      box64: "arm64", 
      dxvk: false,
      resolution: "720p",
      fpsCap: 60,
      env: {
        MESA_GL_VERSION_OVERRIDE: "4.6",
        GALLIUM_DRIVER: "zink"
      }
    }
  };
};

export default function App() {
  const [gpu] = useState(gpuDetect());
  const [launching, setLaunching] = useState(false);

  const launchGame = () => {
    setLaunching(true);
    toast.success("GameHub G57 prêt!", {
      description: `Zink activé | BOX64 arm64 | ${gpu.preset.resolution} @ ${gpu.preset.fpsCap}fps`
    });
    setTimeout(() => setLaunching(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-4">
      <Toaster richColors position="top-center" />
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8 pt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 mb-4 shadow-lg shadow-purple-500/50">
            <Gamepad2 className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            GameHub G57
          </h1>
          <p className="text-gray-400 mt-2">Optimisé Mali-G57</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-purple-500/20">
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-semibold">GPU Détecté</h2>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Renderer</span>
              <span className="font-mono text-green-400">{gpu.renderer}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Driver</span>
              <span className="font-mono text-green-400">Zink + Vulkan</span>
            </div>
          </div>
        </div>

        <button
          onClick={launchGame}
          disabled={launching}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl p-5 font-bold text-lg shadow-lg shadow-purple-500/50 transition-all duration-200 flex items-center justify-center gap-3"
        >
          <Play className="w-6 h-6" />
          {launching? "Lancement..." : "Lancer un jeu"}
        </button>
      </div>
    </div>
  );
}