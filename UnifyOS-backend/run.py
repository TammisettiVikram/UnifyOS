import uvicorn
import os
import sys

# Manually add the current directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    # Import inside the block to prevent top-level import crashes
    from app.main import app
    
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)