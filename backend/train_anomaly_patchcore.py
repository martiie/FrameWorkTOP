from anomalib.data import Folder
# from anomalib.models import Patchcore
from lightning.pytorch import Trainer
from anomalib.data.utils import TestSplitMode, ValSplitMode
import torch
# --- 1. เตรียม dataset (ใช้เฉพาะ good images) ---
datamodule = Folder(
    name="dataset",
    root="dataset",
    normal_dir="good",
    abnormal_dir="bad",
    mask_dir=None,
    normal_split_ratio=0.2,         # แบ่ง 80% train / 20% test อัตโนมัติ
    train_batch_size=4,
    eval_batch_size=4,
    num_workers=0,
)
datamodule.setup()
print(f"Train images: {len(datamodule.train_data.samples)}")
print(f"Test images:  {len(datamodule.test_data.samples)}")



from anomalib.engine import Engine
# --- 2. สร้างโมเดล (เลือกได้หลายแบบ เช่น Padim, CFA, Patchcore) ---
# แทนที่จะเป็น Padim
from anomalib.models import Patchcore
from pytorch_lightning.loggers import TensorBoardLogger

logger = TensorBoardLogger("tb_logs", name="patchcore_training")

model = Patchcore(backbone="resnet18")


print(model.pre_processor.transform)
engine = Engine()

# import torch, gc
# gc.collect()
# torch.cuda.empty_cache()

if __name__ == "__main__":
    import multiprocessing
    multiprocessing.freeze_support()

    # --- 3. เทรน ---
    if torch.cuda.is_available():
        trainer = Trainer(max_epochs=100,
            accelerator="gpu",  # ใช้ GPU ถ้ามี
            devices=1,
            num_sanity_val_steps=0,
            logger=logger)
    else:
        trainer = Trainer(max_epochs=10,
            num_sanity_val_steps=0,
            logger=logger)

    import torch._dynamo
    torch._dynamo.disable()
    trainer.fit(model=model, datamodule=datamodule)

    import torch._dynamo
    torch._dynamo.disable()
    model.to_onnx("Models_PatchCore")
    # gc.collect()
    # torch.cuda.empty_cache()