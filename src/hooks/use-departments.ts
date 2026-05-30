import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { departmentService } from "../services/departments";
import type {
  DepartmentListParams,
  DepartmentRequest,
  UpdateDepartmentRequest,
  UpdateUnitRequest,
  UnitListParams,
  UnitRequest,
} from "../services/departments";
import type { EntityId } from "../services/shared";

export const departmentQueryKeys = {
  all: ["departments"] as const,
  lists: () => [...departmentQueryKeys.all, "list"] as const,
  list: (params?: DepartmentListParams) =>
    [...departmentQueryKeys.lists(), params] as const,
  detail: (id: EntityId) => [...departmentQueryKeys.all, "detail", id] as const,
  units: ["units"] as const,
  unitLists: () => [...departmentQueryKeys.units, "list"] as const,
  unitList: (params?: UnitListParams) =>
    [...departmentQueryKeys.unitLists(), params] as const,
  unitDetail: (id: EntityId) =>
    [...departmentQueryKeys.units, "detail", id] as const,
  activeUnitsByDepartment: (departmentId: EntityId) =>
    [
      ...departmentQueryKeys.units,
      "active-by-department",
      departmentId,
    ] as const,
};

export const useDepartments = (params?: DepartmentListParams) =>
  useQuery({
    queryKey: departmentQueryKeys.list(params),
    queryFn: () => departmentService.getDepartments(params),
  });

export const useDepartment = (id: EntityId, enabled = true) =>
  useQuery({
    queryKey: departmentQueryKeys.detail(id),
    queryFn: () => departmentService.getDepartment(id),
    enabled: enabled && !!id,
  });

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: DepartmentRequest) =>
      departmentService.createDepartment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: departmentQueryKeys.all });
    },
  });
};

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: EntityId;
      payload: UpdateDepartmentRequest;
    }) => departmentService.updateDepartment(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: departmentQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: departmentQueryKeys.detail(variables.id),
      });
    },
  });
};

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: departmentService.deleteDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: departmentQueryKeys.all });
    },
  });
};

export const useUnits = (params?: UnitListParams) =>
  useQuery({
    queryKey: departmentQueryKeys.unitList(params),
    queryFn: () => departmentService.getUnits(params),
  });

export const useUnit = (id: EntityId, enabled = true) =>
  useQuery({
    queryKey: departmentQueryKeys.unitDetail(id),
    queryFn: () => departmentService.getUnit(id),
    enabled: enabled && !!id,
  });

export const useActiveUnitsByDepartment = (
  departmentId: EntityId,
  enabled = true,
) =>
  useQuery({
    queryKey: departmentQueryKeys.activeUnitsByDepartment(departmentId),
    queryFn: () => departmentService.getActiveUnitsByDepartment(departmentId),
    enabled: enabled && !!departmentId,
  });

export const useCreateUnit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UnitRequest) => departmentService.createUnit(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: departmentQueryKeys.units });
      queryClient.invalidateQueries({ queryKey: departmentQueryKeys.all });
    },
  });
};

export const useUpdateUnit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: EntityId;
      payload: UpdateUnitRequest;
    }) => departmentService.updateUnit(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: departmentQueryKeys.units });
      queryClient.invalidateQueries({
        queryKey: departmentQueryKeys.unitDetail(variables.id),
      });
    },
  });
};

export const useDeleteUnit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: departmentService.deleteUnit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: departmentQueryKeys.units });
      queryClient.invalidateQueries({ queryKey: departmentQueryKeys.all });
    },
  });
};
