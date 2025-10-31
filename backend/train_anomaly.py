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


from pytorch_lightning.loggers import TensorBoardLogger
from anomalib.engine import Engine
# --- 2. สร้างโมเดล (เลือกได้หลายแบบ เช่น Padim, CFA, Patchcore) ---
from anomalib.models import Padim

logger = TensorBoardLogger("tb_logs", name="padim_training")

class PadimWithLogging(Padim):
    def training_step(self, batch, batch_idx):
        loss = super().training_step(batch, batch_idx)
        self.log("train_loss", loss, on_epoch=True, prog_bar=True, logger=True)
        return loss

# pre_processor = Padim.configure_pre_processor(image_size=(256, 256)),pre_processor=pre_processor
model = PadimWithLogging(backbone="resnet18")#18

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
    model.to_onnx("Models_Padim")
    # gc.collect()
    # torch.cuda.empty_cache()