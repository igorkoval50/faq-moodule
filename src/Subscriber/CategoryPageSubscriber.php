<?php

namespace Faq\Subscriber;

use Shopware\Storefront\Page\Category\CategoryPageLoadedEvent;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class CategoryPageSubscriber implements EventSubscriberInterface
{
    private EntityRepositoryInterface $manufacturerRepository;

    public function __construct(EntityRepositoryInterface $manufacturerRepository)
    {
        $this->manufacturerRepository = $manufacturerRepository;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            CategoryPageLoadedEvent::class => 'onCategoryPageLoaded',
        ];
    }

    public function onCategoryPageLoaded(CategoryPageLoadedEvent $event): void
    {
        $criteria = new Criteria();
        $criteria->addSorting(new FieldSorting('name'));
        $manufacturers = $this->manufacturerRepository->search($criteria, $event->getContext())->getEntities();

        $extension = new ManufacturersExtension($manufacturers);

        $event->getPage()->addExtension('manufacturers', $extension);
    }
}
