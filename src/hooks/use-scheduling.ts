import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { schedulingService } from "../services/scheduling";
import type {
  DayOfWeek,
  ScheduleRequest,
  UpdateScheduleRequest,
} from "../services/scheduling";
import type { EntityId } from "../services/shared";

export const scheduleQueryKeys = {
  all: ["schedules"] as const,
  list: () => [...scheduleQueryKeys.all, "list"] as const,
  detail: (id: EntityId) => [...scheduleQueryKeys.all, "detail", id] as const,
  unit: (unitId: EntityId) =>
    [...scheduleQueryKeys.all, "unit", unitId] as const,
  unitDay: (unitId: EntityId, dayOfWeek: DayOfWeek) =>
    [...scheduleQueryKeys.unit(unitId), "day", dayOfWeek] as const,
};

export const useSchedules = () =>
  useQuery({
    queryKey: scheduleQueryKeys.list(),
    queryFn: schedulingService.getSchedules,
  });

export const useSchedule = (id: EntityId, enabled = true) =>
  useQuery({
    queryKey: scheduleQueryKeys.detail(id),
    queryFn: () => schedulingService.getSchedule(id),
    enabled: enabled && !!id,
  });

export const useSchedulesByUnit = (unitId: EntityId, enabled = true) =>
  useQuery({
    queryKey: scheduleQueryKeys.unit(unitId),
    queryFn: () => schedulingService.getSchedulesByUnit(unitId),
    enabled: enabled && !!unitId,
  });

export const useSchedulesByUnitAndDay = (
  unitId: EntityId,
  dayOfWeek: DayOfWeek,
  enabled = true,
) =>
  useQuery({
    queryKey: scheduleQueryKeys.unitDay(unitId, dayOfWeek),
    queryFn: () =>
      schedulingService.getSchedulesByUnitAndDay(unitId, dayOfWeek),
    enabled: enabled && !!unitId && !!dayOfWeek,
  });

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ScheduleRequest) =>
      schedulingService.createSchedule(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: scheduleQueryKeys.all });
    },
  });
};

export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: EntityId;
      payload: UpdateScheduleRequest;
    }) => schedulingService.updateSchedule(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: scheduleQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: scheduleQueryKeys.detail(variables.id),
      });
    },
  });
};

export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: schedulingService.deleteSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: scheduleQueryKeys.all });
    },
  });
};
