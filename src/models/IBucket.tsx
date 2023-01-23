export interface IBucket {
  bucketName?: string;
  suggestedBucketName?: string;
  bucketNumber?: number;
  inUse?: boolean;
  filled?: boolean;
  recommendedBucketSize?: number;
  targeBucketSize?: number;
  actualBucketSize?: number;
  selectedRiskLevel?: number;
  recommendedRiskLevel?: number;
  percentageFilled?: number;
}
