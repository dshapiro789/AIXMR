// QR code generation utility
export function generateQRCode(text: string, size: number = 200): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    canvas.width = size;
    canvas.height = size;
    
    // Simple QR code placeholder - in a real app you'd use a proper QR library
    // For demo purposes, we'll create a simple pattern
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    
    ctx.fillStyle = '#000000';
    const cellSize = size / 25;
    
    // Create a simple pattern that looks QR-like
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        if ((i + j + text.length) % 3 === 0) {
          ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
      }
    }
    
    // Add corner markers
    const markerSize = cellSize * 7;
    ctx.fillRect(0, 0, markerSize, markerSize);
    ctx.fillRect(size - markerSize, 0, markerSize, markerSize);
    ctx.fillRect(0, size - markerSize, markerSize, markerSize);
    
    ctx.fillStyle = '#ffffff';
    const innerSize = cellSize * 5;
    const offset = cellSize;
    ctx.fillRect(offset, offset, innerSize, innerSize);
    ctx.fillRect(size - markerSize + offset, offset, innerSize, innerSize);
    ctx.fillRect(offset, size - markerSize + offset, innerSize, innerSize);
    
    ctx.fillStyle = '#000000';
    const dotSize = cellSize * 3;
    const dotOffset = cellSize * 2;
    ctx.fillRect(dotOffset, dotOffset, dotSize, dotSize);
    ctx.fillRect(size - markerSize + dotOffset, dotOffset, dotSize, dotSize);
    ctx.fillRect(dotOffset, size - markerSize + dotOffset, dotSize, dotSize);
    
    resolve(canvas.toDataURL());
  });
}