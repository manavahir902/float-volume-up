import { VolumeController } from '@/components/VolumeController';
import { Button } from '@/components/ui/button';
import { Settings, Info } from 'lucide-react';
import { useState } from 'react';

const Index = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Volume Float</h1>
            <p className="text-blue-100 text-sm">Floating Volume Controller</p>
          </div>
          <Button
            variant="glass"
            size="icon"
            onClick={() => setShowInfo(!showInfo)}
          >
            <Info className="h-5 w-5" />
          </Button>
        </header>

        {/* Info Panel */}
        {showInfo && (
          <div className="mx-6 mb-6 glass-morphism rounded-2xl p-6 animate-in slide-in-from-top-2">
            <h3 className="font-semibold text-white mb-3">How to use:</h3>
            <ul className="space-y-2 text-blue-100 text-sm">
              <li>• Tap the floating button to increase volume</li>
              <li>• Long press to expand controls</li>
              <li>• Drag the button to move it around</li>
              <li>• Use the slider for precise control</li>
            </ul>
            <div className="mt-4 p-3 bg-blue-500/20 rounded-lg">
              <p className="text-xs text-blue-100">
                <strong>Note:</strong> This is a demonstration. In a production app, 
                native Android permissions would be required for system overlay and volume control.
              </p>
            </div>
          </div>
        )}

        {/* Main Demo Area */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="glass-morphism rounded-3xl p-8 mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                <Settings className="h-10 w-10 text-white animate-spin" style={{
                  animation: 'spin 3s linear infinite'
                }} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Floating Volume Control
              </h2>
              <p className="text-blue-100 mb-6">
                Experience a modern floating volume controller with smooth animations 
                and intuitive drag controls.
              </p>
              <div className="flex space-x-4 justify-center">
                <Button variant="glass" size="sm">
                  Android Ready
                </Button>
                <Button variant="glass" size="sm">
                  Material Design
                </Button>
              </div>
            </div>
            
            <p className="text-blue-200 text-sm">
              Look for the floating button on your screen →
            </p>
          </div>
        </div>
      </div>

      {/* Volume Controller */}
      <VolumeController />
    </div>
  );
};

export default Index;
