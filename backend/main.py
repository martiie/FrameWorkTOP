import torch, anomalib, onnxruntime, fastapi, cv2
print("GPU:", torch.cuda.is_available())
print("Anomalib:", anomalib.__version__)
print("ONNXRuntime OK")
